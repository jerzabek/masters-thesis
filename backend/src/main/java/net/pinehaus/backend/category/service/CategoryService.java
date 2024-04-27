package net.pinehaus.backend.category.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.category.model.Category;
import net.pinehaus.backend.category.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public Optional<Category> getCategoryById(int id) {
    return categoryRepository.findById(id);
  }

  public Optional<Category> getCategoryByName(String name) {
    return categoryRepository.findByName(name);
  }

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

}