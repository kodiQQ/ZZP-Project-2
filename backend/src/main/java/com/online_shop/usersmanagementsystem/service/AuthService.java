package com.online_shop.usersmanagementsystem.service;

import com.online_shop.usersmanagementsystem.dto.ReqRes;

public interface AuthService {
    ReqRes register(ReqRes registrationRequest);
    ReqRes login(ReqRes loginRequest);
}
