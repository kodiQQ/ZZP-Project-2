package com.online_shop.usersmanagementsystem.repository;

import com.online_shop.usersmanagementsystem.entity.CategoryEntity;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import com.online_shop.usersmanagementsystem.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomStatusRepo extends JpaRepository<CustomStatusEntity, Integer> {
    List<CustomStatusEntity> findByUserId(Integer userId);

}
