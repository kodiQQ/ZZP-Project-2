package com.online_shop.usersmanagementsystem.controller;

import com.online_shop.usersmanagementsystem.dto.*;
import com.online_shop.usersmanagementsystem.entity.OurUsersEntity;
import com.online_shop.usersmanagementsystem.repository.UsersRepo;
import com.online_shop.usersmanagementsystem.service.AdminUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/adminuser")
@AllArgsConstructor
public class AdminUserController {
    AdminUserService adminUserService;
    UsersRepo usersRepo;

    @PostMapping("/add_category")
    public ResponseEntity<CategoryDto> add_category(@RequestBody CategoryDto categoryDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
//        if (ourUsersOptional.isPresent()){
//            OurUsersEntity ourUsersEntity=ourUsersOptional.get();
//        }else{
//            OurUsersEntity ourUsersEntity=null;
//        }
        return ResponseEntity.ok(adminUserService.add_category(categoryDto,ourUsersEntity));
    }

    @PostMapping("/add_task")
    public ResponseEntity<TaskDto> add_category(@RequestBody TaskDto taskDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
//        if (ourUsersOptional.isPresent()){
//            OurUsersEntity ourUsersEntity=ourUsersOptional.get();
//        }else{
//            OurUsersEntity ourUsersEntity=null;
//        }
        return ResponseEntity.ok(adminUserService.add_task(taskDto,ourUsersEntity));
    }

    @PostMapping("/add_status")
    public ResponseEntity<CustomStatusDto> add_customStatus(@RequestBody CustomStatusDto customStatusDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
//        if (ourUsersOptional.isPresent()){
//            OurUsersEntity ourUsersEntity=ourUsersOptional.get();
//        }else{
//            OurUsersEntity ourUsersEntity=null;
//        }
        return ResponseEntity.ok(adminUserService.add_customStatus(customStatusDto,ourUsersEntity));
    }

    @GetMapping(path = "/getAllCategories")
    public ResponseEntity<CategoryListDto> getAllCategories() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.getAllCategories(ourUsersEntity), HttpStatus.OK);
    }

    @GetMapping(path = "/getAllTasks")
    public ResponseEntity<TaskListDto> getAllTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        System.out.println("111111111");
        return new ResponseEntity<>(adminUserService.getAllTasks(ourUsersEntity), HttpStatus.OK);
    }

    @GetMapping(path = "/getAllCustomStatuses")
    public ResponseEntity<CustomStatusListDto> getAllCustomStatuses() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.getAllCustomStatus(ourUsersEntity), HttpStatus.OK);
    }

    @PutMapping(path = "/putTask/{id}")
    public ResponseEntity<TaskDto> putTask(@PathVariable("id") Integer id,  @RequestBody TaskDto taskDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.putTask(taskDto,ourUsersEntity,id), HttpStatus.OK);
    }

    @PutMapping(path = "/putCategory/{id}")
    public ResponseEntity<CategoryDto> putCategory(@PathVariable("id") Integer id,  @RequestBody CategoryDto categoryDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.putCategory(categoryDto,ourUsersEntity,id), HttpStatus.OK);
    }

    @PutMapping(path = "/putCustomStatus/{id}")
    public ResponseEntity<CustomStatusDto> putCustomStatus(@PathVariable("id") Integer id,  @RequestBody CustomStatusDto customStatusDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.putCustomStatus(customStatusDto,ourUsersEntity,id), HttpStatus.OK);
    }

//    @PatchMapping(path = "/admin/patchNews/{id}")
//    public ResponseEntity<NewsDto> partialUpdate(
//            @PathVariable("id") Long id,
//            @RequestBody NewsDto newsDto,
//            @RequestPart("image") MultipartFile image
//    ) throws IOException {
//        String imagePath = fileStorageService.storeFile(image);
//        newsDto.setImagePath(imagePath);
//        return new ResponseEntity<>(newsService.partialUpdate(id, newsDto), HttpStatus.OK);
//    }

    @DeleteMapping(path = "/deleteTask/{id}")
    public ResponseEntity<TaskDto> deleteNews(@PathVariable("id") Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.deleteTask(ourUsersEntity,id),HttpStatus.OK);
    }

    @DeleteMapping(path = "/deleteCategory/{id}")
    public ResponseEntity<CategoryDto> deleteCategory(@PathVariable("id") Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.deleteCategory(ourUsersEntity,id),HttpStatus.OK);
    }

    @DeleteMapping(path = "/deleteCustomStatus/{id}")
    public ResponseEntity<CustomStatusDto> deleteCustomStatus(@PathVariable("id") Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return new ResponseEntity<>(adminUserService.deleteCustomStatus(ourUsersEntity,id),HttpStatus.OK);
    }

    @GetMapping("/getUser")
    public ResponseEntity<ReqRes> getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<OurUsersEntity> ourUsersOptional=usersRepo.findByEmail(email);
        OurUsersEntity ourUsersEntity=ourUsersOptional.get();
        return ResponseEntity.ok(adminUserService.getUser(ourUsersEntity));

    }



}
