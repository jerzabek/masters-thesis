package net.pinehaus.backend.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.attribute.dto.AttributeValueDTO;
import net.pinehaus.backend.attribute.model.Attribute;
import net.pinehaus.backend.attribute.service.AttributeService;
import net.pinehaus.backend.attribute.service.AttributeValueService;
import net.pinehaus.backend.category.model.Category;
import net.pinehaus.backend.category.service.CategoryService;
import net.pinehaus.backend.product.dto.CreateProductDTO;
import net.pinehaus.backend.product.dto.UpdateProductDTO;
import net.pinehaus.backend.product.model.Product;
import net.pinehaus.backend.product.repository.ProductRepository;
import net.pinehaus.backend.user.model.UserEntity;
import net.pinehaus.backend.util.Slugify;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;
  private final AttributeService attributeService;
  private final AttributeValueService attributeValueService;
  private final CategoryService categoryService;

  public Optional<Product> getProductBySku(String sku) {
    return productRepository.findBySku(sku);
  }

  public Optional<Product> getProductBySlug(String slug) {
    return productRepository.findBySlug(slug);
  }

  public Page<Product> getProductsByCategoryId(int categoryId, int page, int size,
      Sort.Direction sortOrder) {
    return productRepository.findAllByCategoryId(categoryId,
        PageRequest.of(page, size, Sort.by(sortOrder, "price")));
  }

  public Page<Product> getProductsByCategoryIdAndPriceBetween(int categoryId, double min,
      double max, int page, int size, Sort.Direction sortOrder) {
    return productRepository.findAllByCategoryIdAndPriceBetween(categoryId, min, max,
        PageRequest.of(page, size, Sort.by(sortOrder, "price")));
  }

  public Page<Product> getProductsByPriceBetween(double min, double max, int page, int size,
      Sort.Direction sortOrder) {
    return productRepository.findAllByPriceBetween(min, max,
        PageRequest.of(page, size, Sort.by(sortOrder, "price")));
  }

  public Page<Product> getAllProducts(int page, int size, Sort.Direction sortOrder) {
    return productRepository.findAll(PageRequest.of(page, size, Sort.by(sortOrder, "price")));
  }

  public Optional<Product> getProductById(int id) {
    return productRepository.findById(id);
  }

  public Product createProduct(CreateProductDTO product, UserEntity user) {
    Product newProduct = new Product();

    newProduct.setName(product.getName());
    newProduct.setDescription(product.getDescription());
    newProduct.setSku(product.getSku());
    newProduct.setQuantity(product.getQuantity());
    newProduct.setPrice(product.getPrice());
    newProduct.setThumbnail(product.getThumbnail().isBlank() ? null : product.getThumbnail());
    newProduct.setCreatedBy(user);
    newProduct.setAttributes(new ArrayList<>());
    newProduct.setSlug(Slugify.slugify(product.getName()));

    /* Set attributes */
    List<AttributeValueDTO> attributes = product.getAttributes();

    for (AttributeValueDTO attribute : attributes) {
      Optional<Attribute> attributeOptional = attributeService.getById(attribute.getAttributeId());

      if (attributeOptional.isEmpty()) {
        throw new IllegalArgumentException(
            "Attribute with id " + attribute.getAttributeId() + " does not exist.");
      }

      newProduct.getAttributes()
                .add(attributeValueService.setProductAttribute(newProduct, attributeOptional.get(),
                    attribute.getValue()));
    }

    /* Set category */
    Optional<Category> category = categoryService.getCategoryById(product.getCategoryId());

    if (category.isEmpty()) {
      throw new IllegalArgumentException(
          "Category with id " + product.getCategoryId() + " does not exist.");
    }

    newProduct.setCategory(category.get());
    newProduct = productRepository.save(newProduct);

    return newProduct;
  }

  public boolean existsBySku(String sku) {
    return productRepository.existsBySku(sku);
  }

  public boolean existsBySlug(String slug) {
    return productRepository.existsBySlug(slug);
  }

  public boolean existsById(int id) {
    return productRepository.existsById(id);
  }

  public Product updateProduct(Product product, UpdateProductDTO payload) {
    product.setName(payload.getName());
    product.setDescription(payload.getDescription());
    product.setSku(payload.getSku());
    product.setQuantity(payload.getQuantity());
    product.setPrice(payload.getPrice());
    product.setThumbnail(payload.getThumbnail());
    product.setSlug(Slugify.slugify(payload.getName()));

    /* Set category */
    Optional<Category> category = categoryService.getCategoryById(payload.getCategoryId());

    if (category.isEmpty()) {
      throw new IllegalArgumentException(
          "Category with id " + payload.getCategoryId() + " does not exist.");
    }

    product.setCategory(category.get());

    attributeValueService.compareAndUpdateAttributeValues(product, payload.getAttributes());

    return productRepository.save(product);
  }
}