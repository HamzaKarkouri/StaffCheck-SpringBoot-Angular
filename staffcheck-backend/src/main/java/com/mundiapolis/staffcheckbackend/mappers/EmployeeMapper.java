package com.mundiapolis.staffcheckbackend.mappers;

import com.mundiapolis.staffcheckbackend.dtos.AttendanceDTO;
import com.mundiapolis.staffcheckbackend.dtos.EmployeeDTO;
import com.mundiapolis.staffcheckbackend.entities.Attendance;
import com.mundiapolis.staffcheckbackend.entities.Employee;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class EmployeeMapper {
    public EmployeeDTO fromEmployee(Employee employee) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        BeanUtils.copyProperties(employee, employeeDTO);
        return employeeDTO;
    }

    public Employee fromEmployeeDTO(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDTO, employee); //transfer or prender les attriute de customer vers customerDTO elle remplace set set set ex: customerDTO.setId(customer.getId());
        return employee;
    }

    public AttendanceDTO fromAttendance(Attendance attendance){
        AttendanceDTO attendanceDTO=new AttendanceDTO();
        BeanUtils.copyProperties(attendance,attendanceDTO);
        attendanceDTO.setEmployeeDTO(fromEmployee(attendance.getEmployee()));

        return attendanceDTO;
    }
    public Attendance fromAttendanceDTO(AttendanceDTO attendanceDTO){
        Attendance attendance=new Attendance();
        BeanUtils.copyProperties(attendanceDTO,attendance);
        attendance.setEmployee(fromEmployeeDTO(attendanceDTO.getEmployeeDTO()));
        return attendance;
    }
}
