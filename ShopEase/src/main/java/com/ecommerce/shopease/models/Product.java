package com.ecommerce.shopease.models;


import com.ecommerce.shopease.services.CartItemService;
import com.ecommerce.shopease.services.CategoryService;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "specifications")
    private String specifications;

    @Column(name = "stock")
    private int stock;

    @Column(name = "cost")
    private int cost;

    @Column(name = "provider")
    private String provider;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private Set<CartItem> cartItems;
}
