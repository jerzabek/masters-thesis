package net.pinehaus.backend.product.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.category.model.Category;
import net.pinehaus.backend.category.service.CategoryService;
import net.pinehaus.backend.product.dto.CreateProductDTO;
import net.pinehaus.backend.product.dto.ProductPageResponse;
import net.pinehaus.backend.product.dto.UpdateProductDTO;
import net.pinehaus.backend.product.model.Product;
import net.pinehaus.backend.product.model.ProductViews;
import net.pinehaus.backend.product.service.ProductService;
import net.pinehaus.backend.security.UserPrincipal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/products")
@Tag(name = "Products")
@RequiredArgsConstructor
public class ProductController {

  private final static int PAGE_SIZE = 10;
  private final static String DEFAULT_SORT = "asc";

  private final ProductService productService;
  private final CategoryService categoryService;

  @GetMapping("/recommended")
  @Operation(summary = "Recommended products", description = "Get recommended products list for a number of randomly selected categories.")
  @ApiResponse(responseCode = "200")
  @JsonView(ProductViews.Public.class)
  public HashMap<String, List<Product>> getRecommendedProducts() {
    List<Category> categories = categoryService.getAllCategories();
    Collections.shuffle(categories);

    Category randomCategory1 = categories.get(0);
    Category randomCategory2 = categories.get(1);

    HashMap<String, List<Product>> response = new HashMap<>();

    response.put(randomCategory1.getName(), productService.getRandomProductsFromCategory(randomCategory1, 3));
    response.put(randomCategory2.getName(), productService.getRandomProductsFromCategory(randomCategory2, 3));

    return response;
  }

  @GetMapping
  @Operation(summary = "Get paginated products list.",
      description = "Fetch paginated products list, optionally filtered by category and price range.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "404")})
  @JsonView(ProductViews.Public.class)
  public ProductPageResponse getProduct(@RequestParam(required = false) Optional<Integer> page,
      @RequestParam(required = false) Optional<Integer> size,
      @RequestParam(required = false) Optional<String> sort,
      @RequestParam(required = false) Optional<Integer> categoryId,
      @RequestParam(required = false) Optional<Double> min,
      @RequestParam(required = false) Optional<Double> max) {
    int _page = page.orElse(0);
    int _size = size.orElse(PAGE_SIZE);
    Sort.Direction _sort =
        sort.orElse(DEFAULT_SORT).equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

    double _min = min.orElse(0d);
    double _max = max.orElse(Double.MAX_VALUE);

    Page<Product> products;

    if (categoryId.isEmpty()) {
      products = productService.getProductsByPriceBetween(_min, _max, _page, _size, _sort);
    } else {
      products = productService.getProductsByCategoryIdAndPriceBetween(categoryId.get(), _min, _max,
          _page,
          _size, _sort);

    }

    return new ProductPageResponse(products);
  }

  @GetMapping("/{id}")
  @JsonView(ProductViews.Public.class)
  @Operation(summary = "Get a product by ID.", description = "Fetch product by ID, if it exists.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "404")})
  public Product getProduct(@PathVariable int id) {
    return productService.getProductById(id)
                         .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                             "Product not found"));
  }

  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  @JsonView(ProductViews.Public.class)
  @Operation(summary = "Create a product.", description = "Create a new product.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "409")})
  public Product createProduct(@RequestBody CreateProductDTO product,
      @AuthenticationPrincipal UserPrincipal currentUser) {
    if (productService.existsBySku(product.getSku())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Product already exists");
    }

    return productService.createProduct(product, currentUser.getUser());
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('USER')")
  @JsonView(ProductViews.Public.class)
  @Operation(summary = "Update a product.", description = "Update an existing product.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "404"),
      @ApiResponse(responseCode = "403")})
  public Product updateProduct(@PathVariable int id,
      @AuthenticationPrincipal UserPrincipal currentUser,
      @RequestBody UpdateProductDTO productUpdate) {
    Optional<Product> existingProduct = productService.getProductById(id);

    if (existingProduct.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    Product product = existingProduct.get();

    if (!product.getCreatedBy().getId().equals(currentUser.getId()) && !currentUser.isAdmin()) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN,
          "You are not allowed to update this product");
    }

    return productService.updateProduct(product, productUpdate);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('USER')")
  @Operation(summary = "Delete a product.", description = "Delete an existing product.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "404"),
      @ApiResponse(responseCode = "403")})
  public void deleteProduct(@PathVariable int id,
      @AuthenticationPrincipal UserPrincipal currentUser) {
    if (!productService.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    Optional<Product> existingProduct = productService.getProductById(id);

    if (existingProduct.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    if (!existingProduct.get().getCreatedBy().getId().equals(currentUser.getId())
        && !currentUser.isAdmin()) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN,
          "You are not allowed to delete this product");
    }

    productService.deleteProduct(id);
  }

}