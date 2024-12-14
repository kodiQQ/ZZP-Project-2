package com.online_shop.usersmanagementsystem.mappers;


import com.online_shop.usersmanagementsystem.dto.TaskListDto;
import com.online_shop.usersmanagementsystem.entity.TaskEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class TaskListMapperImpl implements Mapper<TaskEntity, TaskListDto> {

    private ModelMapper modelMapper;

    @Override
    public TaskListDto mapTo(TaskEntity taskEntity) {
        return modelMapper.map(taskEntity, TaskListDto.class);
    }


    @Override
    public TaskEntity mapFrom(TaskListDto taskDto) {
        return modelMapper.map(taskDto, TaskEntity.class);
    }
}
