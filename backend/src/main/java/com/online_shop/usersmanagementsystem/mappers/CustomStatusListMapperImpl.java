package com.online_shop.usersmanagementsystem.mappers;

import com.online_shop.usersmanagementsystem.dto.CustomStatusListDto;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class CustomStatusListMapperImpl implements Mapper<CustomStatusEntity, CustomStatusListDto> {

    private ModelMapper modelMapper;

    @Override
    public CustomStatusListDto mapTo(CustomStatusEntity customStatusEntity) {
        return modelMapper.map(customStatusEntity, CustomStatusListDto.class);
    }


    @Override
    public CustomStatusEntity mapFrom(CustomStatusListDto customStatusDto) {
        return modelMapper.map(customStatusDto, CustomStatusEntity.class);
    }
}
