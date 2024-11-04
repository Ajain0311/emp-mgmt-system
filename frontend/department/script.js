document.addEventListener("DOMContentLoaded", function() {
    const BASE_API = "http://localhost:8080";
    let allDepartments = [];
    let isEditMode = false;
    let editingDepartmentId = null;

    // Fetch departments from the API
    async function fetchDepartments() {
        try {
            const response = await fetch(`${BASE_API}/api/departments/get`);
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            allDepartments = await response.json();
            showDepartments(allDepartments);
        } catch (e) {
            console.error("Failed to fetch departments:", e);
        }
    }

    // Display departments in the table
    function showDepartments(departments) {
        const departmentTableBody = document.getElementById("department-table-body");
        departmentTableBody.innerHTML = "";

        departments.forEach(department => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${department.id}</td>
                <td>${department.name}</td>
                <td>${department.role}</td>
                <td>${department.location}</td>
                <td>
                    <button id="edit-dep" class="button" onclick="editDepartment(${department.id})">Edit</button>
                    <button id="del-dep" class="button" onclick="deleteDepartment(${department.id})">Delete</button>
                </td>
            `;
            departmentTableBody.appendChild(row);
        });
    }

    // Open modal to add a new department
    document.getElementById("add-department-link").onclick = function() {
        openModal();
    };

    // Modal controls
    const modal = document.getElementById("department-modal");
    const closeModalButton = document.getElementById("close-modal");
    
    closeModalButton.onclick = closeModal;

    function openModal() {
        document.getElementById("modal-title").innerText = isEditMode ? "Edit Department" : "Add Department";
        modal.style.display = "flex";
    }

    function closeModal() {
        modal.style.display = "none";
        resetForm();
    }

    function resetForm() {
        document.getElementById("department-form").reset();
        isEditMode = false;
        editingDepartmentId = null;
    }

    // Edit department
    window.editDepartment = function(id) {
        const department = allDepartments.find(dep => dep.id === id);
        if (department) {
            document.getElementById("dept-name").value = department.name;
            document.getElementById("dept-role").value = department.role;
            document.getElementById("dept-location").value = department.location;
            isEditMode = true;
            editingDepartmentId = id;
            openModal();
        }
    };

    // Delete department
    window.deleteDepartment = async function(id) {
        try {
            await fetch(`${BASE_API}/api/departments/delete/${id}`, { method: "DELETE" });
            fetchDepartments();
        } catch (e) {
            console.error("Failed to delete department:", e);
        }
    };

    // Form submission for adding/updating a department
    document.getElementById("department-form").addEventListener("submit", async function(event) {
        event.preventDefault();

        const departmentData = {
            name: document.getElementById("dept-name").value,
            role: document.getElementById("dept-role").value,
            location: document.getElementById("dept-location").value
        };

        try {
            const url = isEditMode
                ? `${BASE_API}/api/departments/update/${editingDepartmentId}`
                : `${BASE_API}/api/departments/save`;
            const method = isEditMode ? "PUT" : "POST";

            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(departmentData)
            });

            closeModal();
            fetchDepartments();
        } catch (e) {
            console.error("Failed to save department:", e);
        }
    });

    fetchDepartments();
});
