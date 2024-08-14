package com.mundiapolis.staffcheckbackend.dtos;

import lombok.Data;

import java.util.Date;
@Data
public class AttendanceDTO {
    private Long id;
    private String image;
    private String Name;
    private String day;
    private String checkin;
    private String checkout;
    private String working;
    private EmployeeDTO employeeDTO;
}
