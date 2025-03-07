package com.ecommerce.shopease.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "cartItems_shoppingCart",
            joinColumns = @JoinColumn(name = "cartItem_id"),
            inverseJoinColumns = @JoinColumn(name = "shoppingCart_id"))
    private Set<ShoppingCart> shoppingCarts;
}
