package com.online_shop.usersmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OurUsersDto {
    private Integer id;
    private String firstName;
    private String lastName;
    private String nickName;
    private String email;
    private String message;

}
