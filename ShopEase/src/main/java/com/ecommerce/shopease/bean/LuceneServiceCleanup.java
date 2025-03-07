package com.ecommerce.shopease.bean;

import com.ecommerce.shopease.services.LuceneService;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;

@Component
public class LuceneServiceCleanup {

    private final LuceneService luceneService;

    public LuceneServiceCleanup(LuceneService luceneService) {
        this.luceneService = luceneService;
    }

    @PreDestroy
    public void cleanup() {
        luceneService.closeIndexWriter();
        luceneService.closeIndex();
    }
}
