document.addEventListener("DOMContentLoaded", function () {
  const BASE_API = "http://localhost:8080";
  let allEmployees = [];
  let allDepartments = []; // New variable to store all departments
  let sortOrder = {};
  let currentPage = 1;
  let rowsPerPage = 10; // Default rows per page

  // Fetch employees from the API
  async function fetchEmployees() {
    try {
      const response = await fetch(`${BASE_API}/api/employees/get`);
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      allEmployees = await response.json();
      showEmployees(allEmployees);
      updatePagination();
    } catch (e) {
      console.log("Failed to fetch employees: ", e);
    }
  }

  // Fetch departments from the API
  async function fetchDepartments() {
    try {
      const response = await fetch(`${BASE_API}/api/departments/get`);
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      allDepartments = await response.json();
      populateDepartmentDropdown(allDepartments); // Populate the dropdown
    } catch (e) {
      console.log("Failed to fetch departments: ", e);
    }
  }

  // Populate department dropdown
  // Populate department dropdown with department IDs
  function populateDepartmentDropdown(departments) {
    const departmentDropdown = document.getElementById("department-name");

    // Check if departmentDropdown exists in the DOM
    if (!departmentDropdown) {
      console.error("Dropdown element with id 'department-name' not found.");
      return;
    }

    departmentDropdown.innerHTML = ""; // Clear existing options

    departments.forEach((department) => {
      const option = document.createElement("option");
      option.value = department.id; // Set option value as department ID
      option.textContent = department.id; // Display department name
      departmentDropdown.appendChild(option);
    });
  }

  // Display employees in the table
  function showEmployees(employees) {
    const employeeTableBody = document.getElementById("employee-table-body");
    employeeTableBody.innerHTML = "";

    // Slice data for pagination
    const paginatedData = employees.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

    paginatedData.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.fname}</td>
                <td>${employee.lname}</td>
                <td>${employee.mobnum}</td>
                <td>${employee.altnum ? employee.altnum : "N/A"}</td>
                <td>${employee.mail}</td>
                <td>${employee.salary}</td>
                <td>${employee.doj
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}</td>
                <td>${
                  employee.departmentName ? employee.departmentName : "N/A"
                }</td>
                <td>
                    <button class="actbuttons" onclick="openEditModal(${
                      employee.id
                    })">Edit</button>
                    <button class="actbuttons" id="del-btn" onclick="deleteEmployee(${
                      employee.id
                    })">Delete</button>
                </td>
            `;
      employeeTableBody.appendChild(row);
    });
  }

  document
    .getElementById("add-employee-btn")
    .addEventListener("click", function () {
      document.getElementById("employee-form").reset(); // Clear the form
      document.getElementById("employee-id").value = ""; // Clear hidden employee ID
      document.getElementById("modal-title").innerText = "Add Employee";
      document.getElementById("employeeModal").style.display = "block"; // Show modal
    });

  // Pagination controls
  function updatePagination() {
    const totalPages = Math.ceil(allEmployees.length / rowsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = i === currentPage ? "active" : "";
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showEmployees(allEmployees);
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  // Change rows per page based on dropdown selection
  document
    .getElementById("rows-per-page")
    .addEventListener("change", function (event) {
      rowsPerPage = parseInt(event.target.value);
      currentPage = 1; // Reset to the first page
      showEmployees(allEmployees);
      updatePagination();
    });

  // Sorting functionality
  function sortEmployees(column) {
    const direction = sortOrder[column] === "asc" ? "desc" : "asc";
    sortOrder[column] = direction;

    allEmployees.sort((a, b) => {
      let valA = a[column];
      let valB = b[column];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    showEmployees(allEmployees);
  }

  // Add click listeners for sortable headers
  function addSortListeners() {
    const headers = document.querySelectorAll(".table thead th[data-column]");
    headers.forEach((header) => {
      const column = header.getAttribute("data-column");
      header.addEventListener("click", () => sortEmployees(column));
    });
  }

  // Open the edit modal and fill in the form fields
  window.openEditModal = function (id) {
    const employee = allEmployees.find((emp) => emp.id === id);
    if (employee) {
      document.getElementById("employee-id").value = employee.id;
      document.getElementById("fname").value = employee.fname;
      document.getElementById("lname").value = employee.lname;
      document.getElementById("mobnum").value = employee.mobnum;
      document.getElementById("altnum").value = employee.altnum;
      document.getElementById("mail").value = employee.mail;
      document.getElementById("salary").value = employee.salary;
      document.getElementById("doj").value = employee.doj.split("T")[0];
      document.getElementById("department-name").value =
        employee.departmentName;

      document.getElementById("modal-title").innerText = "Edit Employee";
      document.getElementById("employeeModal").style.display = "block";
    }
  };

  // Delete employee function
  window.deleteEmployee = async function (id) {
    if (!confirm("Are you sure you want to delete the employee?")) {
      return;
    }
    try {
      const response = await fetch(`${BASE_API}/api/employees/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEmployees();
      } else {
        alert("Failed to delete employee");
      }
    } catch (e) {
      console.error("Failed to delete employee: ", e);
    }
  };

  // Handle form submission for adding/editing an employee
  document
    .getElementById("employee-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const employeeData = {
        id: document.getElementById("employee-id").value,
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        mobnum: document.getElementById("mobnum").value,
        altnum: document.getElementById("altnum").value,
        mail: document.getElementById("mail").value,
        salary: document.getElementById("salary").value,
        doj: document.getElementById("doj").value,
        department_id: document.getElementById("department-name").value, // Dropdown value
      };

      const method = employeeData.id ? "PUT" : "POST";
      const url = employeeData.id
        ? `${BASE_API}/api/employees/update/${employeeData.id}`
        : `${BASE_API}/api/employees/save`;

      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });

        if (response.ok) {
          fetchEmployees();
          closeModal();
        } else {
          const errorText = await response.text();
          console.error("Failed to save employee data:", errorText);
          alert("Failed to save employee data");
        }
      } catch (e) {
        console.error("Failed to save employee: ", e);
      }
    });

  // Search functionality
  document.getElementById("search").addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredEmployees = allEmployees.filter(
      (employee) =>
        employee.fname.toLowerCase().includes(searchTerm) ||
        employee.lname.toLowerCase().includes(searchTerm) ||
        employee.mail.toLowerCase().includes(searchTerm)
    );
    showEmployees(filteredEmployees);
  });

  // Modal handling
  const modal = document.getElementById("employeeModal");
  const closeBtn = document.getElementById("close-modal");

  closeBtn.onclick = function () {
    modal.style.display = "none";
    resetForm();
  };

  function resetForm() {
    document.getElementById("employee-form").reset();
    document.getElementById("employee-id").value = "";
    document.getElementById("modal-title").innerText = "Add Employee";
  }

  addSortListeners(); // Initialize sorting listeners
  fetchEmployees();
  fetchDepartments(); // Fetch departments when the page loads
});
