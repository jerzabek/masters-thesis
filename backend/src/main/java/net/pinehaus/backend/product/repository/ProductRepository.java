package net.pinehaus.backend.product.repository;

import java.util.Optional;
import net.pinehaus.backend.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

  Optional<Product> findBySlug(String slug);

  Optional<Product> findById(int id);

  Optional<Product> findBySku(String sku);

  Page<Product> findAllByPriceBetween(double min, double max, Pageable pageable);

  Page<Product> findAllByCategoryId(int categoryId, Pageable pageable);

  Page<Product> findAllByCategoryIdAndPriceBetween(int categoryId, double min, double max,
      Pageable pageable);
  
  boolean existsBySku(String sku);

  boolean existsBySlug(String slug);

  boolean existsById(int id);

}