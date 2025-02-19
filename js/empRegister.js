let form = document.querySelector("form");
let submitButton = document.getElementById("emp-reg-submit-button");


let nameInput = document.getElementById("name");

nameInput.addEventListener("input", () => {
    let namePattern = /^[A-Za-z\s]{3,50}$/;

    if (namePattern.test(nameInput.value)) {
        nameInput.setCustomValidity("");
    } else {
        nameInput.setCustomValidity("Name should only contain letters (3-50 characters). No numbers or special characters allowed.");
    }
});


let profileImages = document.querySelectorAll("input[name='profile-image']");

function isProfileImageSelected() {
    return document.querySelector("input[name='profile-image']:checked") !== null;
}

profileImages.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (isProfileImageSelected()) {
            profileImages[0].setCustomValidity("");
        }
    });
});

form.addEventListener("submit", (event) => {
    if (!isProfileImageSelected()) {
        profileImages[0].setCustomValidity("Please select a profile image.");
        profileImages[0].reportValidity();
        event.preventDefault();
    }
});


let genderOptions = document.querySelectorAll("input[name='gender']");

function isGenderSelected(){
    return document.querySelector("input[name='gender']:checked") !== null;
}

genderOptions.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (isGenderSelected()) {
            genderOptions[0].setCustomValidity("");
        }
    });
});

form.addEventListener("submit", (event) => {
    if (!isGenderSelected()) {
        genderOptions[0].setCustomValidity("Please select a gender.");
        genderOptions[0].reportValidity();
        event.preventDefault();
    }
});



let departmentCheckboxes = document.querySelectorAll("input[name='department']");

function isDepartmentSelected(){
    return document.querySelector("input[name='department']:checked") !==null;
}

departmentCheckboxes.forEach((checkbox) =>{
    checkbox.addEventListener("change", ()=>{
        if (isDepartmentSelected()) {
            departmentCheckboxes[0].setCustomValidity("");
        }
    });
});

form.addEventListener("submit", (event) =>{
    if(!isDepartmentSelected()){
        departmentCheckboxes[0].setCustomValidity("Please select at least one department.")
        departmentCheckboxes[0].reportValidity();
        event.preventDefault();
    }
})

let salarySelect = document.getElementById("salary");

salarySelect.addEventListener("change", () => {
    if (salarySelect.value) {
        salarySelect.setCustomValidity("");
    }
});

form.addEventListener("submit", (event) => {
    if (!salarySelect.value) {
        salarySelect.setCustomValidity("Please select a salary.");
        salarySelect.reportValidity();
        event.preventDefault();
    }
});


form.addEventListener("reset", (event) =>{
    if (!confirm("Are you sure you want to reset the form?")){
        event.preventDefault();
    }
})

let daySelect = document.querySelector("select[name='day']");

let monthSelect = document.querySelector("select[name='month']");

let yearSelect = document.querySelector("select[name='year']");

function validateDay() {
    if (!daySelect.value) {
        daySelect.setCustomValidity("Please select a valid day.");
    } else {
        daySelect.setCustomValidity("");
    }
    daySelect.reportValidity();
}

function validateMonth() {
    if (!monthSelect.value) {
        monthSelect.setCustomValidity("Please select a valid month.");
    } else {
        monthSelect.setCustomValidity("");
    }
    monthSelect.reportValidity();
}

function validateYear() {
    if (!yearSelect.value) {
        yearSelect.setCustomValidity("Please select a valid year.");
    } else {
        yearSelect.setCustomValidity("");
    }
    yearSelect.reportValidity();
}

daySelect.addEventListener("change",validateDay);
monthSelect.addEventListener("change", validateMonth);
yearSelect.addEventListener("change", validateYear);

form.addEventListener("submit", (event) => {
    let isValid = true;

    if (!daySelect.value) {
        validateDay();
        isValid = false;
    }

    if (!monthSelect.value) {
        validateMonth();
        isValid = false;
    }

    if (!yearSelect.value) {
        validateYear();
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});


let checkboxes = document.querySelectorAll("input[name='department']");

form.addEventListener("submit",function(event){
    // event.preventDefault();
    let selectedDepartments = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedDepartments.push(checkbox.value)
        }
     });
    console.log(selectedDepartments);
});