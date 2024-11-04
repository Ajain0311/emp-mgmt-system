package com.emp.employee.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name", nullable = false)
    private String fname;

    @Column(name = "last_name", nullable = false)
    private String lname;

    @Column(name = "mobile_number", nullable = false, length = 10)
    private String mobnum;

    @Column(name = "alternate_number", nullable = true, length = 10)
    private String altnum;

    @Column(name = "email", unique = true, nullable = false)
    private String mail;

    @Column(name = "salary", nullable = false)
    private int salary;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_of_joining")
    private Date doj;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "department_id", referencedColumnName = "id", nullable =
    // true)
    private long department_id;

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

    public long getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(long department) {
        this.department_id = department;
    }
}
