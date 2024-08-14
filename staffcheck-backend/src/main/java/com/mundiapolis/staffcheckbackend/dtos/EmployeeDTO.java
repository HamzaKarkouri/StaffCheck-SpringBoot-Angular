package com.mundiapolis.staffcheckbackend.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class EmployeeDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private Date joining;

    private String image;
    private String role;
    private String department;
    private String qr;
}
