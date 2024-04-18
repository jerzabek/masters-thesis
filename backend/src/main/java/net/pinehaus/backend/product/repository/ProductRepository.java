package net.pinehaus.backend.product.repository;

import java.util.Optional;
import net.pinehaus.backend.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

  Optional<Product> findBySlug(String slug);

  Optional<Product> findById(int id);

  Optional<Product> findBySku(String sku);

  boolean existsBySku(String sku);

  boolean existsBySlug(String slug);

  boolean existsById(int id);

}