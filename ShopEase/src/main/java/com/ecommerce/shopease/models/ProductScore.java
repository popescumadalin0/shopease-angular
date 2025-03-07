package com.ecommerce.shopease.models;

import lombok.Data;

import java.util.Objects;

@Data
public class ProductScore {
    private Long productId;
    private Double score;

    public ProductScore(Long productId, Double score) {
        this.productId = productId;
        this.score = score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductScore that = (ProductScore) o;
        return Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId);
    }
}
