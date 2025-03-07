package com.ecommerce.shopease.repos;

import com.ecommerce.shopease.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
