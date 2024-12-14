package com.online_shop.usersmanagementsystem.mappers;

import com.online_shop.usersmanagementsystem.dto.CategoryDto;
import com.online_shop.usersmanagementsystem.entity.CategoryEntity;
import com.online_shop.usersmanagementsystem.repository.UsersRepo;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class CategoryMapperImpl implements Mapper<CategoryEntity, CategoryDto> {

    private ModelMapper modelMapper;
    private final UsersRepo usersRepo;

    @Override
    public CategoryDto mapTo(CategoryEntity categoryEntity) {
        CategoryDto categoryDto = CategoryDto.builder()
                .name(categoryEntity.getName())
//                .userId(categoryEntity.getUser().getId())
                .build();
        return categoryDto;
    }


    @Override
    public CategoryEntity mapFrom(CategoryDto categoryDto) {

        return CategoryEntity.builder()
                .name(categoryDto.getName())
                .user(usersRepo.findById(categoryDto.getId()).orElse(null))
                .build();
    }
}
