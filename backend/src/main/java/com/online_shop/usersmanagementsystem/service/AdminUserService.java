package com.online_shop.usersmanagementsystem.service;

import com.online_shop.usersmanagementsystem.dto.*;
import com.online_shop.usersmanagementsystem.entity.OurUsersEntity;

public interface AdminUserService {
    CategoryDto add_category(CategoryDto categoryDto, OurUsersEntity ourUsersEntity);
    CategoryListDto getAllCategories(OurUsersEntity ourUsersEntity);
    CategoryDto putCategory(CategoryDto categoryDto, OurUsersEntity ourUsersEntity,Integer id);
    CategoryDto deleteCategory(OurUsersEntity ourUsersEntity,Integer id);

    TaskDto add_task(TaskDto taskDto, OurUsersEntity ourUsersEntity);
    TaskListDto getAllTasks(OurUsersEntity ourUsersEntity);
    TaskDto putTask(TaskDto taskDto, OurUsersEntity ourUsersEntity,Integer id);
    TaskDto deleteTask(OurUsersEntity ourUsersEntity,Integer id);

    CustomStatusDto add_customStatus(CustomStatusDto customStatusDto, OurUsersEntity ourUsersEntity);
    CustomStatusListDto getAllCustomStatus(OurUsersEntity ourUsersEntity);
    CustomStatusDto putCustomStatus(CustomStatusDto customStatusDto,OurUsersEntity ourUsersEntity,Integer id);
    CustomStatusDto deleteCustomStatus(OurUsersEntity ourUsersEntity,Integer id);

    ReqRes getUser(OurUsersEntity ourUsersEntity);

}
