package com.online_shop.usersmanagementsystem.entity;

import jakarta.persistence.*;

import lombok.Data;
import org.springframework.scheduling.config.Task;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="ourusers")
@Data
public class OurUsersEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @Column(nullable = false, unique = true)
    private String name;

//    @Column(nullable = false, unique = true)
    private String city;

    @Column(nullable = false)
    private String password;

    // Pola dodatkowe, jeśli wymagane
    @Column(name = "email", unique = true)
    private String email;

//    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;

    private String role;

    // Relacja z kategoriami
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<CategoryEntity> categories;

    // Relacja z zadaniami
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<TaskEntity> tasks;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}