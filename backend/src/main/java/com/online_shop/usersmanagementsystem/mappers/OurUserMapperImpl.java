package com.online_shop.usersmanagementsystem.mappers;

import com.online_shop.usersmanagementsystem.dto.OurUsersDto;
import com.online_shop.usersmanagementsystem.entity.OurUsersEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class OurUserMapperImpl implements Mapper<OurUsersEntity, OurUsersDto> {

    private ModelMapper modelMapper;

    @Override
    public OurUsersDto mapTo(OurUsersEntity userEntity) {
        return modelMapper.map(userEntity, OurUsersDto.class);
    }


    @Override
    public OurUsersEntity mapFrom(OurUsersDto userDto) {
        return modelMapper.map(userDto, OurUsersEntity.class);
    }
}
