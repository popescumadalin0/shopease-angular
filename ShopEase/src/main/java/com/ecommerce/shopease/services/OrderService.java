package com.ecommerce.shopease.services;

import com.ecommerce.shopease.dtos.OrderDto;
import com.ecommerce.shopease.models.Order;
import com.ecommerce.shopease.models.ShoppingCart;
import com.ecommerce.shopease.repos.OrderRepository;
import com.ecommerce.shopease.repos.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemService cartItemService;

    private final ShoppingCartService shoppingCartService;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        ShoppingCartRepository shoppingCartRepository,
                        CartItemService cartItemService, ShoppingCartService shoppingCartService) {
        this.orderRepository = orderRepository;
        this.cartItemService = cartItemService;
        this.shoppingCartService = shoppingCartService;
    }

    @Transactional
    public OrderDto createOrder() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        ShoppingCart shoppingCart = shoppingCartService.getOrCreateShoppingCart(username);
        String productCode = generateRandomString(5);

        Order order = new Order();
        order.setCode(this.generateRandomString(5));
        order.setTotalCost(shoppingCart.getTotalCost());
        order.setSentDate(new Date());
        order.setShoppingCart(shoppingCart);
        order.setCode(productCode);

        orderRepository.save(order);
        cartItemService.deleteAllCartItems();

        return new OrderDto(order);
    }

    // Helper method to generate a random string of given length
    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder randomString = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * characters.length());
            randomString.append(characters.charAt(index));
        }

        return randomString.toString();
    }

    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return OrderDto.convertEntityListToDtoList(orders);
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            Date currentDate = new Date();
            Date sentDate = order.getSentDate();

            if (sentDate != null && currentDate.getTime() <= sentDate.getTime() + 24 * 60 * 60 * 1000) {
                orderRepository.deleteById(orderId);
            } else {
                throw new RuntimeException("Cannot cancel order. A day has passed since the order was created.");
            }
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }

}
