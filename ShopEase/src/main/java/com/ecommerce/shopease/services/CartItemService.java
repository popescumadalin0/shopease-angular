package com.ecommerce.shopease.services;

import com.ecommerce.shopease.dtos.CartItemDto;
import com.ecommerce.shopease.models.CartItem;
import com.ecommerce.shopease.models.Product;
import com.ecommerce.shopease.models.ShoppingCart;
import com.ecommerce.shopease.repos.CartItemRepository;
import com.ecommerce.shopease.repos.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ShoppingCartService shoppingCartService;

    @Autowired
    public CartItemService(
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            ShoppingCartService shoppingCartService
    ) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.shoppingCartService = shoppingCartService;
    }

    public List<CartItemDto> getAllCartItems() {
        return cartItemRepository.findAll().stream()
                .map(CartItemDto::new)
                .collect(Collectors.toList());
    }

    public CartItemDto createCartItem(CartItemDto cartItemDto) {
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(cartItemDto.getQuantity());

        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        cartItem.setProduct(product);
        cartItem.setShoppingCarts(new HashSet<>());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        ShoppingCart shoppingCart = shoppingCartService.getOrCreateShoppingCart(username);

        cartItem.getShoppingCarts().add(shoppingCart);
        shoppingCart.getCartItems().add(cartItem);
        shoppingCartService.calculateAndUpdateTotalCost(shoppingCart);
        shoppingCartService.saveShoppingCart(shoppingCart);

        decreaseProductStock(product, cartItemDto.getQuantity());

        return new CartItemDto(cartItemRepository.save(cartItem));
    }


    public void deleteCartItem(Long id) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));
        Product product = cartItem.getProduct();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        ShoppingCart shoppingCart = shoppingCartService.getOrCreateShoppingCart(username);

        shoppingCart.getCartItems().remove(cartItem);
        shoppingCartService.calculateAndUpdateTotalCost(shoppingCart);
        cartItemRepository.deleteById(id);
        shoppingCartService.saveShoppingCart(shoppingCart);

        increaseProductStock(product, cartItem.getQuantity());
    }

    public void deleteAllCartItems() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        ShoppingCart shoppingCart = shoppingCartService.getOrCreateShoppingCart(username);
        List<CartItem> cartItems = cartItemRepository.findAll();

        shoppingCart.getCartItems().clear();
        shoppingCartService.calculateAndUpdateTotalCost(shoppingCart);
        shoppingCartService.saveShoppingCart(shoppingCart);

        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            increaseProductStock(product, cartItem.getQuantity());
            cartItemRepository.deleteById(cartItem.getId());
        }
    }

    private void decreaseProductStock(Product product, int quantity) {
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }

    private void increaseProductStock(Product product, int quantity) {
        product.setStock(product.getStock() + quantity);
        productRepository.save(product);
    }
}
