package com.emp.employee.service;

import com.emp.employee.dto.EmployeeDTO;
import com.emp.employee.model.Employee;
import java.util.List;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);

    List<EmployeeDTO> getAllEmployees();

    Employee getEmployeeById(int id);

    void deleteEmployee(int id);

    Employee updateEmployee(int id, Employee employee);

    Employee assignDepartment(int employeeId, Long departmentId);

}
