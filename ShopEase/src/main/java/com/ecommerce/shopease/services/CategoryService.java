package com.ecommerce.shopease.services;

import com.ecommerce.shopease.models.Category;
import com.ecommerce.shopease.repos.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category) {
        Category existingCategory = categoryRepository.findById(category.getId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving category id"));
        existingCategory.setDescription(category.getDescription());
        existingCategory.setName(category.getName());
        return categoryRepository.save(existingCategory);
    }

    public String deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return "Category " + id + " has been deleted";
    }
}
