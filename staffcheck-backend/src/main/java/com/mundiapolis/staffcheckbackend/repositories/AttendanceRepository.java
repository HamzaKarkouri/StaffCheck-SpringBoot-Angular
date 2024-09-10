package com.mundiapolis.staffcheckbackend.repositories;

import com.mundiapolis.staffcheckbackend.entities.Attendance;
import com.mundiapolis.staffcheckbackend.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> getAttendanceByEmployee_Id(Long employeeId);
    Optional<Attendance> findByEmployeeIdAndCheckoutIsNull(Long employeeId);
    @Query("select c from Attendance c where c.Name like :kw")
    List<Attendance> searchAttendance(@Param("kw") String keyword);
}
