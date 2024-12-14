package com.online_shop.usersmanagementsystem.service.impl;

import com.online_shop.usersmanagementsystem.dto.*;
import com.online_shop.usersmanagementsystem.entity.CategoryEntity;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import com.online_shop.usersmanagementsystem.entity.OurUsersEntity;
import com.online_shop.usersmanagementsystem.entity.TaskEntity;
import com.online_shop.usersmanagementsystem.mappers.Mapper;
import com.online_shop.usersmanagementsystem.repository.CategoryRepo;
import com.online_shop.usersmanagementsystem.repository.CustomStatusRepo;
import com.online_shop.usersmanagementsystem.repository.TaskRepo;
import com.online_shop.usersmanagementsystem.repository.UsersRepo;
import com.online_shop.usersmanagementsystem.service.AdminUserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Data
public class AdminUserServiceImpl implements AdminUserService {

    private final CategoryRepo categoryRepo;
    private final CustomStatusRepo customStatusRepo;
    private final TaskRepo taskRepo;
    private final Mapper<CategoryEntity, CategoryDto> categoryMapper;
    private final Mapper<TaskEntity, TaskDto> taskMapper;
    private final Mapper<CustomStatusEntity, CustomStatusDto> customStatusMapper;
    private final UsersRepo usersRepo;

    @Override
    public  CategoryDto add_category(CategoryDto categoryDto, OurUsersEntity ourUsersEntity) {
        CategoryEntity categotyEntity=CategoryEntity.builder().name(categoryDto.getName()).user(ourUsersEntity).build();
        categoryRepo.save(categotyEntity);
        return categoryMapper.mapTo(categotyEntity);
    }

    @Override
    public CustomStatusDto add_customStatus(CustomStatusDto customStatusDto, OurUsersEntity ourUsersEntity) {
        CustomStatusEntity customStatusEntity=CustomStatusEntity.builder().name(customStatusDto.getName()).user(ourUsersEntity).build();
        customStatusRepo.save(customStatusEntity);
        return customStatusMapper.mapTo(customStatusEntity);
    }

    @Override
    public  TaskDto add_task(TaskDto taskDto, OurUsersEntity ourUsersEntity) {
        TaskEntity taskEntity=new TaskEntity();
        System.out.println("11111111111111111111111111");
        CategoryEntity categoryEntity=categoryRepo.getById(taskDto.getCategoryId());
        CustomStatusEntity customStatusEntity=customStatusRepo.getById(taskDto.getCustomStatusId());
        if(categoryEntity.getUser().getId()!=ourUsersEntity.getId()||customStatusEntity.getUser().getId()!=ourUsersEntity.getId()){
            System.out.println("Podano id kategorii lub statusu niewłaściwego usera");
        }else{
            taskEntity=TaskEntity.builder()
                    .user(ourUsersEntity)
                    .title(taskDto.getTitle())
                    .description(taskDto.getDescription())
                    .customStatus(customStatusEntity)
                    .category(categoryEntity)
                    .user(ourUsersEntity)
                    .build();
            System.out.println("2222222222222222222222");
//        System.out.println(taskEntity.toString());
            taskRepo.save(taskEntity);
        }

        System.out.println("333333333333333333333333");

        TaskDto taskDto2=taskMapper.mapTo(taskEntity);

        System.out.println("44444444444444444444444");
        return taskDto2;
    }
    @Override
    public CategoryListDto getAllCategories(OurUsersEntity ourUsersEntity){
        List<CategoryEntity> categories = categoryRepo.findByUserId(ourUsersEntity.getId());
//        System.out.println(categories.get(0));
        CategoryListDto categoryDto= CategoryListDto.builder().categoryEntityList(categories).build();
        return categoryDto;

    }

    @Override
    public TaskListDto getAllTasks(OurUsersEntity ourUsersEntity){
        System.out.println(ourUsersEntity.getId());
        System.out.println("22222222");
//        List<TaskEntity> tasks = taskRepo.findByUserId(ourUsersEntity.getId());
        List<TaskEntity> tasks=taskRepo.findAll();
        System.out.println(tasks.size());
        ArrayList<TaskEntity> usersTasks=new ArrayList();
        for(TaskEntity taskEntity:tasks){
            if(taskEntity.getUser().getId()==ourUsersEntity.getId()){
                usersTasks.add(taskEntity);
            }
        }
//        tasks.forEach(task -> System.out.println(task.toString()));
        TaskListDto taskListDto= TaskListDto.builder().taskEntityList(usersTasks).build();
        return taskListDto;
    }

    @Override
    public CustomStatusListDto getAllCustomStatus(OurUsersEntity ourUsersEntity){
        List<CustomStatusEntity> customStatuses = customStatusRepo.findByUserId(ourUsersEntity.getId());
        CustomStatusListDto customStatusDto= CustomStatusListDto.builder().customStatusEntityList(customStatuses).build();
        return customStatusDto;
    }

//    @Override
//    public TaskDto putTask(TaskDto taskDto, OurUsersEntity ourUsersEntity,Integer id){
//        //mapowanie
//        TaskDto currentTaskDto=new TaskDto();
//        try{
//            OurUsersEntity ourUsersEntity2=usersRepo.getById(taskDto.getUserId());
//            CategoryEntity categoryEntity=categoryRepo.getById(taskDto.getCategoryId());
//            TaskEntity taskEntity=TaskEntity.builder()
//                    .id(id)
//                    .title(taskDto.getTitle())
//                    .description(taskDto.getDescription())
//                    .status(taskDto.getStatus())
//                    .category(categoryEntity)
//                    .user(ourUsersEntity2)
//                    .build();
//
//
//            TaskEntity temporaryTaskEntity=taskRepo.getById(id);
//            //sprawdzenie czy task należy do usera:
//            if (ourUsersEntity.getId()==temporaryTaskEntity.getUser().getId()){
//                taskRepo.save(taskEntity);
//                currentTaskDto.setStatusCode(200);
//                currentTaskDto.setMessage("Success");
//
//            }else{
//                currentTaskDto.setStatusCode(500);
//                currentTaskDto.setMessage("User has not permissions");
//            }
//        }catch (Exception e){
//            currentTaskDto.setStatusCode(500);
//            currentTaskDto.setMessage("Error: "+e.getMessage());
//            e.printStackTrace();
//        }
//        return currentTaskDto;
//    }

    @Override
    public TaskDto putTask(TaskDto taskDto, OurUsersEntity ourUsersEntity,Integer id){
        TaskDto currentTaskDto=new TaskDto();

        try{
//            TaskEntity taskEntity=taskMapper.mapFrom(taskDto);
            CustomStatusEntity customStatusEntity=customStatusRepo.getById(taskDto.getCustomStatusId());
            CategoryEntity categoryEntity=categoryRepo.getById(taskDto.getCategoryId());
            TaskEntity taskEntity=TaskEntity.builder()
                    .id(id)
                    .title(taskDto.getTitle())
                    .description(taskDto.getDescription())
                    .customStatus(customStatusEntity)
                    .category(categoryEntity)
                    .user(ourUsersEntity)
                    .build();
            TaskEntity temporaryTaskEntity=taskRepo.getById(id);
            //sprawdzenie czy task należy do usera:
            if (ourUsersEntity.getId()==temporaryTaskEntity.getUser().getId()){
                taskRepo.save(taskEntity);
                currentTaskDto.setStatusCode(200);
                currentTaskDto.setMessage("Success");

            }else{
                currentTaskDto.setStatusCode(500);
                currentTaskDto.setMessage("User has not permissions");
            }
        }catch (Exception e){
            currentTaskDto.setStatusCode(500);
            currentTaskDto.setMessage("Error: "+e.getMessage());
            e.printStackTrace();
        }
        return currentTaskDto;
    }
    @Override
    public CategoryDto putCategory(CategoryDto categoryDto,OurUsersEntity ourUsersEntity,Integer id){
        categoryDto.setId(id);
        CategoryDto currentCategoryDto=new CategoryDto();
        System.out.println("1111111111111111");
        System.out.println(id);
        try{
            CategoryEntity categoryEntity=CategoryEntity.builder()
                    .id(id)
                    .user(ourUsersEntity)
                    .name(categoryDto.getName())
                    .build();


            System.out.println("2222222222222222");
            CategoryEntity temporaryCategoryEntity=categoryRepo.getById(id);
            System.out.println("3333333333333333");
            //sprawdzenie czy task należy do usera:
            if (ourUsersEntity.getId()==temporaryCategoryEntity.getUser().getId()){
                categoryRepo.save(categoryEntity);
                currentCategoryDto.setStatusCode(200);
                currentCategoryDto.setMessage("Success");

            }else{
                currentCategoryDto.setStatusCode(500);
                currentCategoryDto.setMessage("User has not permissions");
            }
        }catch (Exception e){
            currentCategoryDto.setStatusCode(500);
            currentCategoryDto.setMessage("Error: "+e.getMessage());
            e.printStackTrace();
        }
        return currentCategoryDto;
    }

    @Override
    public CustomStatusDto putCustomStatus(CustomStatusDto customStatusDto,OurUsersEntity ourUsersEntity,Integer id){
        CustomStatusDto currentCustomStatusDto=new CustomStatusDto();

        try{
            CustomStatusEntity customStatusEntity=CustomStatusEntity.builder()
                    .id(id)
                    .user(ourUsersEntity)
                    .name(customStatusDto.getName())
                    .build();
            CustomStatusEntity temporaryCustomStatusEntity=customStatusRepo.getById(id);
            //sprawdzenie czy task należy do usera:
            if (ourUsersEntity.getId()==temporaryCustomStatusEntity.getUser().getId()){
                customStatusRepo.save(customStatusEntity);
                currentCustomStatusDto.setStatusCode(200);
                currentCustomStatusDto.setMessage("Success");

            }else{
                currentCustomStatusDto.setStatusCode(500);
                currentCustomStatusDto.setMessage("User has not permissions");
            }
        }catch (Exception e){
            currentCustomStatusDto.setStatusCode(500);
            currentCustomStatusDto.setMessage("Error: "+e.getMessage());
            e.printStackTrace();
        }
        return currentCustomStatusDto;
    }

    @Override
    public TaskDto deleteTask(OurUsersEntity ourUsersEntity,Integer id){
        TaskDto taskDto=new TaskDto();
        TaskEntity taskEntity=taskRepo.getById(id);
        //sprawdzenie czy użytkownik ma uprawnienia
        if(taskEntity.getUser().getId()==ourUsersEntity.getId()){
            taskRepo.delete(taskEntity);
            taskDto.setStatusCode(200);
            taskDto.setMessage("Success");
        }else{
            taskDto.setStatusCode(500);
            taskDto.setMessage("You have no permissions");
        }
        return taskDto;
    }

    @Override
    public CategoryDto deleteCategory(OurUsersEntity ourUsersEntity,Integer id){
        CategoryDto categoryDto=new CategoryDto();
        CategoryEntity categoryEntity=categoryRepo.getById(id);
        //sprawdzenie czy użytkownik ma uprawnienia
        if(categoryEntity.getUser().getId()==ourUsersEntity.getId()){
            //sprawdzenie czy status nie jest przypisany do zadania
            Optional<TaskEntity> optionalTaskEntity= taskRepo.findByCategory(categoryEntity);
            if(!optionalTaskEntity.isPresent()){
                categoryRepo.delete(categoryEntity);
                categoryDto.setStatusCode(200);
                categoryDto.setMessage("Success");
            }else{
                categoryDto.setStatusCode(500);
                categoryDto.setMessage("Category can not be deleted. Some of the tasks contains it");
            }

        }else{
            categoryDto.setStatusCode(500);
            categoryDto.setMessage("You have no permissions");
        }
        return categoryDto;
    }

    @Override
    public CustomStatusDto deleteCustomStatus(OurUsersEntity ourUsersEntity,Integer id){
        CustomStatusDto customStatusDto=new CustomStatusDto();
        CustomStatusEntity customStatusEntity=customStatusRepo.getById(id);
        if(customStatusEntity.getUser().getId()==ourUsersEntity.getId()){
            //sprawdzenie czy status nie jest przypisany do zadania
            Optional<TaskEntity> optionalTaskEntity= taskRepo.findByCustomStatus(customStatusEntity);
            if(!optionalTaskEntity.isPresent()){
                customStatusRepo.delete(customStatusEntity);
                customStatusDto.setStatusCode(200);
                customStatusDto.setMessage("Success");
            }else{
                customStatusDto.setStatusCode(500);
                customStatusDto.setMessage("Custom status can not be deleted. Some of the tasks contains it");
            }


        }else{
            customStatusDto.setStatusCode(500);
            customStatusDto.setMessage("You have no permissions");
        }
        return customStatusDto;
    }





    public ReqRes getUser(OurUsersEntity ourUsersEntity) {
        ReqRes reqRes = new ReqRes();
        try {
//            OurUsersEntity usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setOurUsersEntity(ourUsersEntity);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + ourUsersEntity.getId() + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }


//    public ReqRes deleteUser(Integer userId) {
//        ReqRes reqRes = new ReqRes();
//        try {
//            Optional<OurUsersEntity> userOptional = usersRepo.findById(userId);
//            if (userOptional.isPresent()) {
//                usersRepo.deleteById(userId);
//                reqRes.setStatusCode(200);
//                reqRes.setMessage("User deleted successfully");
//            } else {
//                reqRes.setStatusCode(404);
//                reqRes.setMessage("User not found for deletion");
//            }
//        } catch (Exception e) {
//            reqRes.setStatusCode(500);
//            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
//        }
//        return reqRes;
//    }


    //    public ReqRes getAllUsers() {
//        ReqRes reqRes = new ReqRes();
//
//        try {
//            List<OurUsersEntity> result = usersRepo.findAll();
//            if (!result.isEmpty()) {
//                reqRes.setOurUsersEntityList(result);
//                reqRes.setStatusCode(200);
//                reqRes.setMessage("Successful");
//            } else {
//                reqRes.setStatusCode(404);
//                reqRes.setMessage("No users found");
//            }
//            return reqRes;
//        } catch (Exception e) {
//            reqRes.setStatusCode(500);
//            reqRes.setMessage("Error occurred: " + e.getMessage());
//            return reqRes;
//        }
//    }




}
