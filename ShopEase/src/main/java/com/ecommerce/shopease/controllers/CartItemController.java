package com.ecommerce.shopease.controllers;

import com.ecommerce.shopease.dtos.CartItemDto;
import com.ecommerce.shopease.services.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart-items")
@CrossOrigin(origins = "http://localhost:4200/")
@PreAuthorize("hasRole('USER')")
public class CartItemController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('user:read')")
    public List<CartItemDto> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user:create')")
    public CartItemDto createCartItem(@RequestBody CartItemDto cartItemDto) {
        return cartItemService.createCartItem(cartItemDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('user:delete')")
    public Map<String, String> deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
        return Collections.singletonMap("response", "CartItem " + id + " has been deleted.");
    }

    @DeleteMapping("/all")
    @PreAuthorize("hasAuthority('user:delete')")
    public Map<String, String> deleteAllCartItems() {
        cartItemService.deleteAllCartItems();
        return Collections.singletonMap("response", "All CartItems have been deleted.");
    }
}
