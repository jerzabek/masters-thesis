package net.pinehaus.backend.product.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.product.model.Product;
import net.pinehaus.backend.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;

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
      double max,
      int page, int size, Sort.Direction sortOrder) {
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

  public Product createProduct(Product product) {
    return productRepository.save(product);
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

  public Product updateProduct(Product product) {
    return productRepository.save(product);
  }
}