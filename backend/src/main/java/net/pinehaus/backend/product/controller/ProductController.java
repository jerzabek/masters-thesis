package net.pinehaus.backend.product.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.product.model.Product;
import net.pinehaus.backend.product.service.ProductService;
import net.pinehaus.backend.security.UserPrincipal;
import net.pinehaus.backend.user.model.UserViews;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

  private final ProductService productService;

  @GetMapping("/{id}")
  @Operation(summary = "Get a product by ID.", description = "Fetch product by ID, if it exists.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "404")})
  public Product getProduct(@PathVariable int id) {
    return productService.getProductById(id)
                         .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                             "Product not found"));
  }

  @PostMapping
  @PreAuthorize("hasAuthority('USER')")
  @Operation(summary = "Create a product.", description = "Create a new product.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "409")})
  public Product createProduct(Product product) {
    if (productService.existsBySku(product.getSku()) || productService.existsBySlug(
        product.getSlug())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Product already exists");
    }

    return productService.createProduct(product);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('USER')")
  @JsonView(UserViews.Public.class)
  @Operation(summary = "Update a product.", description = "Update an existing product.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "404"),
      @ApiResponse(responseCode = "403")})
  public Product updateProduct(@PathVariable int id,
      @AuthenticationPrincipal UserPrincipal currentUser, @RequestBody Product productUpdate) {
    Optional<Product> existingProduct = productService.getProductById(id);

    if (existingProduct.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    Product product = existingProduct.get();

    if (!product.getCreatedBy().getId().equals(currentUser.getId()) && !currentUser.isAdmin()) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN,
          "You are not allowed to update this product");
    }

    return productService.updateProduct(product);
  }


}