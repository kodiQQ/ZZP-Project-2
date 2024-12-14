package com.online_shop.usersmanagementsystem.controller;

import com.online_shop.usersmanagementsystem.dto.ReqRes;
import com.online_shop.usersmanagementsystem.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(authService.login(req));
    }
    @PostMapping("/register")
    public ResponseEntity<ReqRes> regeister(@RequestBody ReqRes reg){
        System.out.println("123123");
        return ResponseEntity.ok(authService.register(reg));
    }

//    @PostMapping("/refresh")
//    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
//        return ResponseEntity.ok(usersManagementService.refreshToken(req));
//    }
}
