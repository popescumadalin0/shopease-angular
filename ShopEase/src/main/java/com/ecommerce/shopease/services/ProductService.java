package com.ecommerce.shopease.services;

import com.ecommerce.shopease.dtos.ProductDto;
import com.ecommerce.shopease.models.Category;
import com.ecommerce.shopease.models.Product;
import com.ecommerce.shopease.models.ProductScore;
import com.ecommerce.shopease.repos.CategoryRepository;
import com.ecommerce.shopease.repos.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final LuceneService luceneService;

    @Autowired
    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            LuceneService luceneService
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.luceneService = luceneService;
    }

    public List<ProductDto> searchProductBySpecifications(String query) {
        Set<ProductScore> productScores = luceneService.search("specifications", query);

        List<Product> productsFromLucene = productRepository.findAllById(
                productScores.stream()
                        .map(ProductScore::getProductId)
                        .collect(Collectors.toList())
        );

        Map<Long, Double> luceneProductMap = productScores.stream()
                .collect(Collectors.toMap(ProductScore::getProductId, ProductScore::getScore));

        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : productsFromLucene) {
            Long productId = product.getId();
            Double score = luceneProductMap.getOrDefault(productId, -1.0);

            productDtos.add(new ProductDto(product, score));
        }

        List<ProductDto> productsFromNameSearch = searchProductByName(query);

        productsFromNameSearch.removeIf(productDto -> luceneProductMap.containsKey(productDto.getId()));

        productDtos.addAll(productsFromNameSearch);

        return productDtos;
    }


    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductDto::new).collect(Collectors.toList());
    }

    public ProductDto saveProduct(ProductDto productDto) {
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving productDto category."));

        Product product = new Product();

        product.setName(productDto.getName());
        product.setSpecifications(productDto.getSpecifications());
        product.setStock(productDto.getStock());
        product.setProvider(productDto.getProvider());
        product.setDescription(productDto.getDescription());
        product.setCategory(category);
        product.setCost(productDto.getCost());
        product.setImage(productDto.getImage());

        var addedProduct = productRepository.save(product);

        luceneService.indexProduct(addedProduct.getId(), product.getSpecifications());

        return new ProductDto(addedProduct);
    }

    public ProductDto updateProduct(ProductDto productDto) {
        Product product = productRepository.findById(productDto.getId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving product id"));

        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Error while retrieving productDto category."));

        product.setName(productDto.getName());
        product.setSpecifications(productDto.getSpecifications());
        product.setStock(productDto.getStock());
        product.setProvider(productDto.getProvider());
        product.setDescription(productDto.getDescription());
        product.setCategory(category);
        product.setCost(productDto.getCost());
        product.setImage(productDto.getImage());

        luceneService.indexProduct(product.getId(), product.getSpecifications());

        return new ProductDto(productRepository.save(product));
    }

    public String deleteProduct(Long id) {
        productRepository.deleteById(id);
        return "Product " + id + " has been deleted.";
    }

    public List<ProductDto> getProductsByCategory(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(ProductDto::new).collect(Collectors.toList());
    }

    public List<ProductDto> searchProductByName(String query) {
        //List<Product> products = productRepository.findByNameContainingIgnoreCase(query);
        //return products.stream();

        // Split the query string into individual words
        String[] keywords = query.split("\\s+");

        // Initialize a list to hold products that match all keywords
        List<Product> matchedProducts = new ArrayList<>();

        // Loop through each keyword and find products containing all keywords
        for (String keyword : keywords) {
            List<Product> productsContainingKeyword = productRepository.findByNameContainingIgnoreCase(keyword);

            if (matchedProducts.isEmpty()) {
                // If matchedProducts is empty, add all products containing the current keyword
                matchedProducts.addAll(productsContainingKeyword);
            } else {
                // If matchedProducts is not empty, retain only those products containing the current keyword
                matchedProducts.retainAll(productsContainingKeyword);
            }
        }

        // Map and collect the matched products into ProductDto objects
        return matchedProducts.stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());
    }


    public List<String> getPredictiveSearchSuggestions(String query) {
        List<String> suggestions = new ArrayList<>();
        List<Product> products = productRepository.findByNameContainingIgnoreCase(query);
        for (Product product : products) {
            suggestions.add(product.getName());
        }
        return suggestions;
    }
}
