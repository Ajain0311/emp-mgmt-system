package com.emp.employee.service;

import com.emp.employee.model.Department;
import java.util.List;

public interface DepartmentService {

    Department saveDepartment(Department department);

    List<Department> getAllDepartments();

    Department getDepartmentById(long id);

    void deleteDepartment(long id);

    Department updateDepartment(long id, Department department);
}
