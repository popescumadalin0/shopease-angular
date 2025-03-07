package com.ecommerce.shopease.dtos;

import com.ecommerce.shopease.models.Order;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class OrderDto {
    private Long id;
    private String code;
    private Date sentDate;
    private int totalCost;

    public OrderDto(Order order) {
        this.id = order.getId();
        this.code = order.getCode();
        this.sentDate = order.getSentDate();
        this.totalCost = order.getTotalCost();
    }

    public static List<OrderDto> convertEntityListToDtoList(List<Order> orders) {
        return orders.stream()
                .map(OrderDto::new)
                .collect(Collectors.toList());
    }
}
