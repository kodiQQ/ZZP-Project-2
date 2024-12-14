package com.online_shop.usersmanagementsystem.mappers;

import com.online_shop.usersmanagementsystem.dto.CategoryListDto;
import com.online_shop.usersmanagementsystem.entity.CategoryEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class CategoryListMapperImpl implements Mapper<CategoryEntity, CategoryListDto> {

    private ModelMapper modelMapper;

    @Override
    public CategoryListDto mapTo(CategoryEntity categoryEntity) {
        return modelMapper.map(categoryEntity, CategoryListDto.class);
    }


    @Override
    public CategoryEntity mapFrom(CategoryListDto categoryDto) {
        return modelMapper.map(categoryDto, CategoryEntity.class);
    }
}
