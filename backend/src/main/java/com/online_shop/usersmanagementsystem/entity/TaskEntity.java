package com.online_shop.usersmanagementsystem.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.online_shop.usersmanagementsystem.Enum.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tasks")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //    @Column(nullable = false)
    private String title;

    @Column(length = 1000) // Maksymalna długość opisu
    private String description;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = true)
//    private TaskStatus status;

    @ManyToOne
    @JoinColumn(name = "customstatus_id")
    private CustomStatusEntity customStatus;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference // Zapobiega cyklicznej serializacji
    private OurUsersEntity user;

    @Override
    public String toString() {
        return "TaskEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status=" + customStatus +
                ", category=" + (category != null ? category.getId() : null) +
                ", user=" + (user != null ? user.getId() : null) +
                '}';
    }
}

