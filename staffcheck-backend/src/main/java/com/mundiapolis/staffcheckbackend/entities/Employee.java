package com.mundiapolis.staffcheckbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Name;
    private String Department;
    @Column(unique = true)
    private String email;
    private String role;
    @Column(name = "phone_number")
    private String phoneNumber;
    private Date joining;
//    @Column(nullable = false, unique = true)
@Lob
@Column(length = 5024)
private String image;
    @Column(length = 1024) // Specify the length here
    @Lob // Indicates large object type, like BLOB or CLOB
    private String qr;
    @OneToMany(mappedBy = "employee") //type de relation est One To Many
    private List<Attendance> attendances;
}
