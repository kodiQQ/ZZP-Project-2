package com.online_shop.usersmanagementsystem.mappers;

import com.online_shop.usersmanagementsystem.dto.CustomStatusDto;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import com.online_shop.usersmanagementsystem.repository.UsersRepo;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class CustomStatusMapperImpl implements Mapper<CustomStatusEntity, CustomStatusDto> {

    private ModelMapper modelMapper;
    private final UsersRepo usersRepo;

    @Override
    public CustomStatusDto mapTo(CustomStatusEntity customStatusEntity) {
        CustomStatusDto customStatusDto = CustomStatusDto.builder()
                .name(customStatusEntity.getName())
                .userId(customStatusEntity.getUser().getId())
                .build();
        return customStatusDto;
    }


    @Override
    public CustomStatusEntity mapFrom(CustomStatusDto customStatusDto) {

        return CustomStatusEntity.builder()
                .name(customStatusDto.getName())
                .user(usersRepo.findById(customStatusDto.getId()).orElse(null))
                .build();
    }
}
