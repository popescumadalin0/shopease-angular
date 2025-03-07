package com.ecommerce.shopease.repos;

import com.ecommerce.shopease.models.Product;
import com.ecommerce.shopease.models.ShoppingCart;
import com.ecommerce.shopease.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    Optional<ShoppingCart> findByUser(User user);
}
