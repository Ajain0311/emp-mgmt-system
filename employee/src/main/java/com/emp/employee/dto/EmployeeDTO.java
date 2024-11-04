package com.emp.employee.dto;

import java.util.Date;

public class EmployeeDTO {

    private int id;
    private String fname;
    private String lname;
    private String mobnum;
    private String altnum;
    private String mail;
    private int salary;
    private Date doj;
    private long department_id;
    private String departmentName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getMobnum() {
        return mobnum;
    }

    public void setMobnum(String mobnum) {
        this.mobnum = mobnum;
    }

    public String getAltnum() {
        return altnum;
    }

    public void setAltnum(String altnum) {
        this.altnum = altnum;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public Date getDoj() {
        return doj;
    }

    public void setDoj(Date doj) {
        this.doj = doj;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String department) {
        this.departmentName = department;
    }

    public long getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(long department) {
        this.department_id = department;
    }
}
