package com.ecommerce.shopease.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "order_cost")
    private int totalCost;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "sent_date")
    private Date sentDate;

    @OneToOne(mappedBy = "order")
    private ShoppingCart shoppingCart;
}
