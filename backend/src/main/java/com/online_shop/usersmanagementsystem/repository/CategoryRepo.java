package com.online_shop.usersmanagementsystem.repository;

import com.online_shop.usersmanagementsystem.entity.CategoryEntity;
import com.online_shop.usersmanagementsystem.entity.ProductsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepo extends JpaRepository<CategoryEntity, Integer> {
    List<CategoryEntity> findByUserId(Integer userId);
    CategoryEntity findById(int id);
}
