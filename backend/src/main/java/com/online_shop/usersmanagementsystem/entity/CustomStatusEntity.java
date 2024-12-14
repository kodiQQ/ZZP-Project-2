package com.online_shop.usersmanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "custom_status", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "name"}))
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomStatusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @Column()
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference // Zapobiega cyklicznej serializacji
    private OurUsersEntity user;
}
