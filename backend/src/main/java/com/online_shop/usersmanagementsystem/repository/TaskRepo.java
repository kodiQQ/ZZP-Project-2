package com.online_shop.usersmanagementsystem.repository;

import com.online_shop.usersmanagementsystem.entity.CategoryEntity;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import com.online_shop.usersmanagementsystem.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.config.Task;

import java.util.List;
import java.util.Optional;

public interface TaskRepo extends JpaRepository<TaskEntity, Integer> {
    List<TaskEntity> findByUserId(Integer userId);
    Optional<TaskEntity> findByCustomStatus(CustomStatusEntity customStatusEntity);
    Optional<TaskEntity> findByCategory(CategoryEntity categoryEntity);

}
