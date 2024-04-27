package net.pinehaus.backend.category.repository;

import java.util.Optional;
import net.pinehaus.backend.category.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

  Optional<Category> findById(int id);

  Optional<Category> findByName(String name);

}