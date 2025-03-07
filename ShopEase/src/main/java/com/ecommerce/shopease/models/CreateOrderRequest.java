package com.ecommerce.shopease.models;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private Long shoppingCartId;
    private String code;
}
