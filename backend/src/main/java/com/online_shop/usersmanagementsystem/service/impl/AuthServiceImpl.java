package com.online_shop.usersmanagementsystem.service.impl;

import com.online_shop.usersmanagementsystem.dto.CustomStatusDto;
import com.online_shop.usersmanagementsystem.dto.ReqRes;
import com.online_shop.usersmanagementsystem.entity.CustomStatusEntity;
import com.online_shop.usersmanagementsystem.entity.OurUsersEntity;
import com.online_shop.usersmanagementsystem.repository.*;
import com.online_shop.usersmanagementsystem.service.AdminUserService;
import com.online_shop.usersmanagementsystem.service.AuthService;
import com.online_shop.usersmanagementsystem.service.JWTUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
@Data
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsersRepo usersRepo;
    private final CustomStatusRepo customStatusRepo;



    private final JWTUtils jwtUtils;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;



    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();

        try {
            OurUsersEntity ourUser = new OurUsersEntity();
            ourUser.setEmail(registrationRequest.getEmail());
            System.out.println(registrationRequest.getCity());

            ourUser.setCity(registrationRequest.getCity());
            ourUser.setRole("USER");
            ourUser.setName(registrationRequest.getName());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            System.out.println(ourUser);
            OurUsersEntity ourUsersEntityResult = usersRepo.save(ourUser);



            if (ourUsersEntityResult.getId() > 0) {
                resp.setOurUsersEntity((ourUsersEntityResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }
            //Dodanie standardowych statusów
            Optional<OurUsersEntity> newOurUsersEntity = usersRepo.findByEmail(registrationRequest.getEmail());
            CustomStatusEntity customStatusEntity1=CustomStatusEntity.builder().name("NEW").user(newOurUsersEntity.get()).build();
            CustomStatusEntity customStatusEntity2 = CustomStatusEntity.builder().name("IN_PROGRESS").user(newOurUsersEntity.get()).build();
            CustomStatusEntity customStatusEntity3 = CustomStatusEntity.builder().name("COMPLETED").user(newOurUsersEntity.get()).build();
            add_customStatus(customStatusEntity1);
            add_customStatus(customStatusEntity2);
            add_customStatus(customStatusEntity3);
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }


    public void add_customStatus(CustomStatusEntity customStatusEntity) {
        customStatusRepo.save(customStatusEntity);
    }
}
