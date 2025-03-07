package com.ecommerce.shopease.controllers;

import com.ecommerce.shopease.models.Category;
import com.ecommerce.shopease.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/api/categories")
@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('admin:read') OR hasAuthority('user:read')")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public Category createCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public Category updateCategory(@RequestBody Category category) {
        return categoryService.updateCategory(category);
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasAuthority('admin:create')")
    public Map<String, String> deleteCategory(@PathVariable Long id) {
        return Collections.singletonMap("response", categoryService.deleteCategory(id));
    }
}
