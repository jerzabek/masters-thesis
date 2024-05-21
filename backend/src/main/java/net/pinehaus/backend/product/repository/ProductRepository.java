package net.pinehaus.backend.product.repository;

import java.util.Optional;
import net.pinehaus.backend.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {

  Optional<Product> findById(int id);

  Page<Product> findAllByCategoryId(int categoryId, Pageable pageable);

  @Query("SELECT p FROM Product p WHERE (:categoryId is null or p.category.id = :categoryId) AND p.price BETWEEN :min AND :max AND lower(p.name) LIKE lower(concat('%', :name, '%'))")
  Page<Product> findAllByOptionalCategoryIdAndPriceBetweenAndNameContainingIgnoreCase(
      Optional<Integer> categoryId, double min, double max, String name, Pageable pageable);

  boolean existsBySku(String sku);

  boolean existsById(int id);

}