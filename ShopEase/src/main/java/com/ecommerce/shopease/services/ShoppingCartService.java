package com.ecommerce.shopease.services;

import com.ecommerce.shopease.models.ShoppingCart;
import com.ecommerce.shopease.repos.ShoppingCartRepository;
import com.ecommerce.shopease.security.user.User;
import com.ecommerce.shopease.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@Service
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;

    private final UserRepository userRepository;

    @Autowired
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository, UserRepository userRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.userRepository = userRepository;
    }

    public ShoppingCart getOrCreateShoppingCart(String username) {
        Optional<User> user = this.userRepository.findByUsername(username);
        return shoppingCartRepository.findByUser(user.get())
                .orElseGet(() -> {
                    ShoppingCart newShoppingCart = new ShoppingCart();
                    newShoppingCart.setUser(user.get());
                    newShoppingCart.setCartItems(new HashSet<>());
                    newShoppingCart.setTotalCost(0);
                    return shoppingCartRepository.save(newShoppingCart);
                });
    }

    public void saveShoppingCart(ShoppingCart shoppingCart) {
        shoppingCartRepository.save(shoppingCart);
    }

    public void calculateAndUpdateTotalCost(ShoppingCart shoppingCart) {
        int totalCost = shoppingCart.getCartItems().stream()
                .map(cartItem -> cartItem.getQuantity() * cartItem.getProduct().getCost())
                .reduce(0, Integer::sum);

        shoppingCart.setTotalCost(totalCost);
    }
}
