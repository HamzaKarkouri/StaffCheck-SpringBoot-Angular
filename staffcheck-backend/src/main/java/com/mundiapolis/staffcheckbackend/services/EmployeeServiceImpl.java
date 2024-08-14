package com.mundiapolis.staffcheckbackend.services;

import com.mundiapolis.staffcheckbackend.dtos.AttendanceDTO;
import com.mundiapolis.staffcheckbackend.dtos.EmployeeDTO;
import com.mundiapolis.staffcheckbackend.entities.Attendance;
import com.mundiapolis.staffcheckbackend.entities.Employee;
import com.mundiapolis.staffcheckbackend.exceptions.AttendanceNotFoundException;
import com.mundiapolis.staffcheckbackend.exceptions.EmployeeNotFoundException;
import com.mundiapolis.staffcheckbackend.mappers.EmployeeMapper;
import com.mundiapolis.staffcheckbackend.repositories.AttendanceRepository;
import com.mundiapolis.staffcheckbackend.repositories.EmployeeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;



@AllArgsConstructor
@Service
@Slf4j
public class EmployeeServiceImpl implements EmployeeService{
    private EmployeeRepository employeeRepository;
    private AttendanceRepository attendanceRepository;
    private QrCodeService qrCodeGenerator;
    private EmployeeMapper dtoMapper;
    private static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
    @Override
    public EmployeeDTO getEmployee(Long employeeId) throws EmployeeNotFoundException {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee Not found"));
        return dtoMapper.fromEmployee(employee);
    }
    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {
        EmployeeServiceImpl.log.info("Saving new Employee");
        Employee employee=dtoMapper.fromEmployeeDTO(employeeDTO);
        Employee savedEmployee = employeeRepository.save(employee);
        return dtoMapper.fromEmployee(savedEmployee);
    }
    @Override
    public void deleteEmployee(Long employeeId){

        employeeRepository.deleteById(employeeId);
    }



    @Override
    public List<EmployeeDTO> searchEmployees(String keyword) {
        List<Employee> employees=employeeRepository.searchEmployee(keyword);
        List<EmployeeDTO> employeesDTOS= employees.stream().map(empl->dtoMapper.fromEmployee(empl)).collect(Collectors.toList());
        return employeesDTOS;
    }


    @Override
    public List<EmployeeDTO> listEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        List<EmployeeDTO> employeeDTOS = employees.stream()
                .map(employee -> dtoMapper.fromEmployee(employee))
                .collect(Collectors.toList());

        return employeeDTOS;
    }

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO)  {
        EmployeeServiceImpl.log.info("Saving new Employee");

        // Convert DTO to entity
        Employee employee = dtoMapper.fromEmployeeDTO(employeeDTO);

        // Save employee to get the assigned ID
        Employee savedEmployee = employeeRepository.save(employee);
        EmployeeServiceImpl.log.info("Employee saved successfully: " + savedEmployee.getId());

        // Generate QR code
        try {
            String qrText = "Employee ID: " + savedEmployee.getId() + ", Name: " + savedEmployee.getName();
            byte[] qrCode = qrCodeGenerator.generateQRCode(qrText, 200, 200);
            String qrCodeBase64 = Base64.getEncoder().encodeToString(qrCode);
            savedEmployee.setQr(qrCodeBase64); // Set QR code in entity
            EmployeeServiceImpl.log.info("QR code generated successfully");
            System.out.println("Generated QR Code: " + qrCodeBase64);

            // Save employee again with the QR code
            savedEmployee = employeeRepository.save(savedEmployee);
            EmployeeServiceImpl.log.info("Employee updated with QR code successfully: " + savedEmployee.getId());
        } catch (Exception e) {
            EmployeeServiceImpl.log.error("Error generating QR code", e);
        }


//        try {
//            String imageFile = employeeDTO.getImage();
//            log.info(imageFile);
//            byte[] imageBytes = imageFile.getBytes();
//            String hash = hashImageService.generateHash(imageBytes);
//
//            savedEmployee.setImage(hash);
//// Save employee again with the QR code
//            savedEmployee = employeeRepository.save(savedEmployee);
//        }
//        catch (Exception e) {
//            EmployeeServiceImpl.log.error("Error generating image hash", e);
//        }









        // Convert entity back to DTO
        EmployeeDTO savedEmployeeDTO = dtoMapper.fromEmployee(savedEmployee);
        return savedEmployeeDTO;
    }







    @Override //Ajouter cette methode a interface
    public AttendanceDTO saveAttendance(Long employeeId)
            throws EmployeeNotFoundException {
        Employee employee=employeeRepository.findById(employeeId).orElse(null);
        if(employee==null)
            throw new EmployeeNotFoundException("Employee not found");

// Find unclosed attendance record
        Optional<Attendance> unclosedAttendance = attendanceRepository
                .findByEmployeeIdAndCheckoutIsNull(employeeId);
        if (unclosedAttendance.isPresent()) {
            // Check-Out
            Attendance attendance = unclosedAttendance.get();
String checkout=formatTime(new Date());
String checkin =attendance.getCheckin();
            LocalTime checkinTime = LocalTime.parse(attendance.getCheckin(), timeFormatter);
            LocalTime checkoutTime = LocalTime.now();
// Calculate duration
            Duration duration = Duration.between(checkinTime, checkoutTime);
            long hours = duration.toHours();
            long minutes = duration.toMinutes() % 60;

            attendance.setWorking(String.format("%d h and %d min", hours, minutes));
            attendance.setCheckout(checkout);

            Attendance savedattendance =attendanceRepository.save(attendance);
            return dtoMapper.fromAttendance(savedattendance);
        } else {
            Attendance attendance=new Attendance();
            Date now = new Date();
            attendance.setDay(formatDate(now));
            attendance.setCheckin(formatTime(now)); // set day
            attendance.setName(employee.getName());
            attendance.setImage(employee.getImage());
        attendance.setEmployee(employee);
        Attendance savedattendance = attendanceRepository.save(attendance);
        return dtoMapper.fromAttendance(savedattendance);}
    }

    private String formatDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        return dateFormat.format(date);
    }

    private String formatTime(Date date) {
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        return timeFormat.format(date);
    }



//    @Override
//    public List<AttendanceDTO> attendanceList(){
//        List<Attendance> Attendances = attendanceRepository.findAll();
//        List<AttendanceDTO> attendanceDTOS = Attendances.stream()
//                .map(attendance -> dtoMapper.fromAttendance(attendance))
//                .collect(Collectors.toList());
//
//        return attendanceDTOS;
//    }


    @Override
    public List<AttendanceDTO> getAttendanceByEmployeeId(Long employeeId) {
        List<Attendance> attendanceList = attendanceRepository.getAttendanceByEmployee_Id(employeeId);
        List<AttendanceDTO> attendanceDTOS;

        attendanceDTOS = attendanceList.stream().map(attendance -> {

                return dtoMapper.fromAttendance((Attendance) attendance);

        }).collect(Collectors.toList());

        return attendanceDTOS;
    }

    @Override
    public List<AttendanceDTO> searchAttendances(String keyword) {
        List<Attendance> attendances=attendanceRepository.searchAttendance(keyword);
        List<AttendanceDTO> attendancesDTOS= attendances.stream().map(empl->dtoMapper.fromAttendance(empl)).collect(Collectors.toList());
        return attendancesDTOS;
    }

}
