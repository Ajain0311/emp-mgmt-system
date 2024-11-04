package com.emp.employee.service.impl;

import com.emp.employee.model.Employee;
import com.emp.employee.dto.EmployeeDTO;
import com.emp.employee.model.Department;
import com.emp.employee.repository.EmployeeRepository;
import com.emp.employee.repository.DepartmentRepository;
import com.emp.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<EmployeeDTO> employeeDTOs = new ArrayList<>();
        List<Employee> employees = employeeRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();

        for (Employee employee : employees) {
            Long departmentId = employee.getDepartment_id();
            Department department = departmentRepository.findById(departmentId).orElse(null);

            EmployeeDTO employeeDTO = mapper.convertValue(employee, EmployeeDTO.class);
            if (department != null) {
                employeeDTO.setDepartmentName(department.getName());
            } else {
                employeeDTO.setDepartmentName("Unknown Department"); // Default value
                System.out.println("Department not found for employee ID " + employee.getId());
            }
            employeeDTOs.add(employeeDTO);
        }
        return employeeDTOs;
    }

    @Override
    public Employee getEmployeeById(int id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteEmployee(int id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID " + id));
        Department department = departmentRepository.findById(employee.getDepartment_id())
                .orElseThrow(() -> new RuntimeException("Department not found for employee ID " + id));

        List<Employee> employees = department.getEmployees();
        employees.remove(employee);
        departmentRepository.save(department);

        employeeRepository.delete(employee);
    }

    @Override
    public Employee updateEmployee(int id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setFname(employeeDetails.getFname());
        employee.setLname(employeeDetails.getLname());
        employee.setMobnum(employeeDetails.getMobnum());
        employee.setAltnum(employeeDetails.getAltnum());
        employee.setMail(employeeDetails.getMail());
        employee.setSalary(employeeDetails.getSalary());
        employee.setDoj(employeeDetails.getDoj());
        employee.setDepartment_id(employeeDetails.getDepartment_id());

        return employeeRepository.save(employee);
    }

    @Override
    public Employee assignDepartment(int employeeId, Long departmentId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        employee.setDepartment_id(department.getId());
        return employeeRepository.save(employee);
    }

}
