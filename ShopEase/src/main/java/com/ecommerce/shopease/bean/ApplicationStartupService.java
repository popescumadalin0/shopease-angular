package com.ecommerce.shopease.bean;

import com.ecommerce.shopease.services.LuceneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class ApplicationStartupService {

    private final LuceneService luceneService;

    @Autowired
    public ApplicationStartupService(LuceneService luceneService) {
        this.luceneService = luceneService;
    }

    @PostConstruct
    public void initialize() {
        luceneService.indexExistingProducts();
    }
}
