package com.ecommerce.shopease.repos;

import com.ecommerce.shopease.models.CartItem;
import com.ecommerce.shopease.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
