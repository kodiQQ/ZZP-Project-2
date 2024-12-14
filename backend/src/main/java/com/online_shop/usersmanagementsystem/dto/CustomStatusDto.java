package com.online_shop.usersmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import com.online_shop.usersmanagementsystem.entity.TaskEntity;
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
public class CustomStatusDto {
    private Integer id;
    private String name;
    private Integer userId;
    private String message;
    private int statusCode;



}
