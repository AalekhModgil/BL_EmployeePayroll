document.addEventListener("DOMContentLoaded", () => {
    let employeeTableBody = document.querySelector(".emp-dash-table-body");
    let addUserButton = document.querySelector(".emp-dash-nav-add-user button");
    let searchBox = document.getElementById("emp-dash-main-search-box");

    function loadEmployees() {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        employeeTableBody.innerHTML = "";

        employees.forEach((employee, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div class="emp-dash-table-body-img">
                        <img src="${employee.profileImage}" alt="Employee Photo">
                        <span>${employee.name}</span>
                    </div>
                </td>
                <td>${employee.gender}</td>
                <td>${employee.departments.join(", ")}</td>
                <td>${employee.salary}</td>
                <td>${employee.startDate}</td>
                <td class="emp-actions">
                    <i class="fa-solid fa-pen edit-btn" data-index="${index}"></i>
                    <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });

        // Attach event listeners to edit and delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", deleteEmployee);
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", editEmployee);
        });
    }

    // Redirect to the registration form for adding a new employee
    function addEmployee() {
        localStorage.removeItem("editEmployee"); // Clear any existing edit data
        window.location.href = "./empRegister.html"; // Redirect to registration form
    }

    // Delete an employee
    function deleteEmployee(event) {
        let index = event.target.dataset.index;
        let employees = JSON.parse(localStorage.getItem("employees")) || [];

        employees.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employees));

        loadEmployees();
    }

    // Edit employee (Redirect to edit form with data)
    function editEmployee(event) {
        let index = event.target.dataset.index;
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        let employee = employees[index];

        // Store data for editing
        localStorage.setItem("editEmployee", JSON.stringify({ employee, index }));

        // Redirect to the registration form (with existing data)
        window.location.href = "./empRegister.html";
    }

    // Search employee by name
    function searchByName() {
        let searchValue = searchBox.value.toLowerCase();
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        let hasMatch = false;
    
        employeeTableBody.innerHTML = ""; // Clear existing rows
    
        employees.forEach((employee, index) => {
            if (employee.name.toLowerCase().includes(searchValue)) {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>
                        <div class="emp-dash-table-body-img">
                            <img src="${employee.profileImage}" alt="Employee Photo">
                            <span>${employee.name}</span>
                        </div>
                    </td>
                    <td>${employee.gender}</td>
                    <td>${employee.departments.join(", ")}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.startDate}</td>
                    <td class="emp-actions">
                        <i class="fa-solid fa-pen edit-btn" data-index="${index}"></i>
                        <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
                    </td>
                `;
                employeeTableBody.appendChild(row);
                hasMatch = true;
            }
        });
    
        if (!hasMatch) {
            employeeTableBody.innerHTML = `<tr id="no-match-message"><td colspan="6" style="text-align: center; font-weight: bold; color: red;">No matches found</td></tr>`;
        } else {
            attachEventListeners(); // Reattach event listeners after filtering
        }
    }
    
    function attachEventListeners() {
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", deleteEmployee);
        });
    
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", editEmployee);
        });
    }
    
    // Attach event listener to the search box
    searchBox.addEventListener("input", searchByName);
    
    
    // Attach event listeners
    addUserButton.addEventListener("click", addEmployee);
    searchBox.addEventListener("input", searchByName);

    // Load employees on page load
    loadEmployees();
});
