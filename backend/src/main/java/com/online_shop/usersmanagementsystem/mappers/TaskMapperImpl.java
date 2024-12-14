package com.online_shop.usersmanagementsystem.mappers;


import com.online_shop.usersmanagementsystem.dto.TaskDto;
import com.online_shop.usersmanagementsystem.entity.TaskEntity;
import com.online_shop.usersmanagementsystem.repository.CategoryRepo;
import com.online_shop.usersmanagementsystem.repository.CustomStatusRepo;
import com.online_shop.usersmanagementsystem.repository.UsersRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
@Data
public class TaskMapperImpl implements Mapper<TaskEntity, TaskDto> {

    private ModelMapper modelMapper;

    private final CategoryRepo categoryRepo;
    private final CustomStatusRepo customStatusRepo;
//    private final CustomStatusRepo customStatusRepo;
//    private final TaskRepo taskRepo;
    private final UsersRepo usersRepo;

    @Override
    public TaskDto mapTo(TaskEntity taskEntity) {
        TaskDto taskDto = TaskDto.builder()
                .title(taskEntity.getTitle())
                .description(taskEntity.getDescription())
                .customStatusId(taskEntity.getCustomStatus().getId())
                .categoryId(taskEntity.getCategory().getId())
                .userId(taskEntity.getUser().getId())
                .build();
        return taskDto;
    }


    @Override
    public TaskEntity mapFrom(TaskDto taskDto) {

        TaskEntity taskEntity = TaskEntity.builder()
                .title(taskDto.getTitle())
                .description(taskDto.getDescription())
                .customStatus(customStatusRepo.findById(taskDto.getCategoryId()).orElseThrow(() ->
                        new IllegalArgumentException("CustomStatus not found with id: " + taskDto.getCustomStatusId())))
                .category(categoryRepo.findById(taskDto.getCategoryId()).orElseThrow(() ->
                        new IllegalArgumentException("Category not found with id: " + taskDto.getCategoryId())))
                .user(usersRepo.findById(taskDto.getUserId()).orElseThrow(()-> new IllegalArgumentException("User not found with id: " + taskDto.getUserId())))
                .build();
        return taskEntity;
    }
}
