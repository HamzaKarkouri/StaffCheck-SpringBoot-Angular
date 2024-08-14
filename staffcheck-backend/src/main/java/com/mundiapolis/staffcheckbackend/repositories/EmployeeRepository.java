package com.mundiapolis.staffcheckbackend.repositories;

import com.mundiapolis.staffcheckbackend.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("select c from Employee c where c.Name like :kw")
    List<Employee> searchEmployee(@Param("kw") String keyword);
}
