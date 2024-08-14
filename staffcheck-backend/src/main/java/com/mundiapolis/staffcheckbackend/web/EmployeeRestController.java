package com.mundiapolis.staffcheckbackend.web;

import com.mundiapolis.staffcheckbackend.dtos.AttendanceDTO;
import com.mundiapolis.staffcheckbackend.dtos.EmployeeDTO;
import com.mundiapolis.staffcheckbackend.exceptions.EmployeeNotFoundException;
import com.mundiapolis.staffcheckbackend.services.EmployeeService;
import com.mundiapolis.staffcheckbackend.services.QrCodeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class EmployeeRestController {
    private EmployeeService employeeService;


    @GetMapping("/employees")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<EmployeeDTO> employees() {

        return employeeService.listEmployees();
    }

    @GetMapping("/employees/search")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<EmployeeDTO> searchEmployees(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return employeeService.searchEmployees("%" + keyword + "%");
    }

    @GetMapping("/employees/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public EmployeeDTO getEmployee(@PathVariable(name = "id") Long employeeId) throws EmployeeNotFoundException {
        return employeeService.getEmployee(employeeId);
    }

    @PostMapping("/employees")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public EmployeeDTO saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        return employeeService.saveEmployee(employeeDTO);
    }

    @PutMapping("/employee/{employeeId}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public EmployeeDTO updateEmployee(@PathVariable Long employeeId, @RequestBody EmployeeDTO employeeDTO) {
        employeeDTO.setId(employeeId);
        return employeeService.updateEmployee(employeeDTO);
    }

    @DeleteMapping("/employee/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }



//    @GetMapping("/attendance")
//    @PreAuthorize("hasAuthority('SCOPE_USER')")
//    public List<AttendanceDTO> attendances() {
//
//        return employeeService.attendanceList();
//    }

    @PostMapping("/attendance")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public AttendanceDTO saveAttendance(@RequestBody Map<String, Long> request) throws EmployeeNotFoundException {
        Long employeeId = request.get("employeeId");
        return employeeService.saveAttendance(employeeId);
    }
    @GetMapping("/attendances/search")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public List<AttendanceDTO> searchAttendances(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return employeeService.searchAttendances("%" + keyword + "%");
    }
}
