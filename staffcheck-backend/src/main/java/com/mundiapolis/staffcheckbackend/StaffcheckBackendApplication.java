package com.mundiapolis.staffcheckbackend;

import com.mundiapolis.staffcheckbackend.dtos.EmployeeDTO;
import com.mundiapolis.staffcheckbackend.services.EmployeeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.stream.Stream;

@SpringBootApplication
public class StaffcheckBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(StaffcheckBackendApplication.class, args);
    }



//    @Bean
//    CommandLineRunner commandLineRunner(EmployeeService employeeService) {
//        return args -> {
//            Stream.of("Zoubair", "Hamza", "Khalid").forEach(name -> {
//                EmployeeDTO employee = new EmployeeDTO();
//                employee.setName(name);
//                employee.setEmail(name + "@gmail.com");
//                employee.setJoining(new Date());
//
//                employee.setPhoneNumber("051234567");
//                employee.setRole("Developer");
//                employee.setDepartment("IT");
//                employee.setImage("Image");
//
//                employeeService.saveEmployee(employee);
//            });
//        };
//    }

}