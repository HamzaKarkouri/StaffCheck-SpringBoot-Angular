package com.mundiapolis.staffcheckbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@DiscriminatorValue("CA")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Name;
    @Lob
    @Column(length = 5024)
    private String image;
    private String day;
    private String checkin;
    private String checkout;
    private String working;

    @ManyToOne //un attendance concern un employee : Plusieur attendances pour un employee
    private Employee employee;
}
