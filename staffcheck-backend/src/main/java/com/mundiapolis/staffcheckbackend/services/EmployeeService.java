package com.mundiapolis.staffcheckbackend.services;

import com.mundiapolis.staffcheckbackend.dtos.AttendanceDTO;
import com.mundiapolis.staffcheckbackend.dtos.EmployeeDTO;
import com.mundiapolis.staffcheckbackend.exceptions.AttendanceNotFoundException;
import com.mundiapolis.staffcheckbackend.exceptions.EmployeeNotFoundException;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

public interface EmployeeService {
    EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) ;
    EmployeeDTO getEmployee(Long employeeId) throws EmployeeNotFoundException;
    EmployeeDTO updateEmployee(EmployeeDTO employeeDTO);
    void deleteEmployee(Long employeeId);

    List<EmployeeDTO> searchEmployees(String keyword);
    List<EmployeeDTO> listEmployees();

    AttendanceDTO saveAttendance(Long employeeId) throws EmployeeNotFoundException;
//    List<AttendanceDTO> attendanceList();
    List<AttendanceDTO> searchAttendances(String keyword);
    List<AttendanceDTO> getAttendanceByEmployeeId(Long employeeId);
}
