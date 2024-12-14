package com.online_shop.usersmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="products")
@Data
public class ProductsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String category;
    private String price;
}
