package com.online_shop.usersmanagementsystem.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomStatusListDto {
    private List<CustomStatusEntity> customStatusEntityList;
    private String message;
    private int statusCode;


}
