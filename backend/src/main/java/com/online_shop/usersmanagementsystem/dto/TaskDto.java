package com.online_shop.usersmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.online_shop.usersmanagementsystem.Enum.TaskStatus;
import com.online_shop.usersmanagementsystem.entity.CategoryEntity;
import com.online_shop.usersmanagementsystem.entity.OurUsersEntity;
import com.online_shop.usersmanagementsystem.entity.TaskEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    //    private Integer id;
    private String title;
    private String description;
    //    private TaskStatus status;
    private Integer customStatusId;
    private Integer categoryId;
    private Integer userId;
    private String message;
    private int statusCode;



}
