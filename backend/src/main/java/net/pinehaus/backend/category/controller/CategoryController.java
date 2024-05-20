package net.pinehaus.backend.category.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.category.model.Category;
import net.pinehaus.backend.category.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/categories")
@Tag(name = "Categories")
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping("/{id}")
  public Category getCategory(@PathVariable int id) {
    return categoryService.getCategoryById(id).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found")
    );
  }

  @GetMapping
  public Iterable<Category> getAllCategories() {
    return categoryService.getAllCategories();
  }

}