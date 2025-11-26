package com.zhhoo.demo.dto;

import com.zhhoo.demo.domain.User;

public class LoginResponse {

    private final Long id;
    private final String loginId;
    private final String name;

    public LoginResponse(Long id, String loginId, String name) {
        this.id = id;
        this.loginId = loginId;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getName() {
        return name;
    }

    public static LoginResponse from(User user) {
        return new LoginResponse(
                user.getId(),
                user.getLoginId(),
                user.getName()
        );
    }
}
