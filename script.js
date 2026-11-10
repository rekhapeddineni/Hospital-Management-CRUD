
let patients = JSON.parse(localStorage.getItem("patients")) || [];

const patientForm = document.getElementById("patientForm");
const patientTable = document.getElementById("patientTable");

function savePatients() {
    localStorage.setItem("patients", JSON.stringify(patients));
}

// READ: Display patient records
function displayPatients(data = patients) {
    patientTable.innerHTML = "";

    data.forEach((patient) => {
        const row = document.createElement("tr");

        const values = [
            patient.id,
            patient.name,
            patient.age,
            patient.gender,
            patient.phone,
            patient.disease
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editPatient(patient.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deletePatient(patient.id);

        actions.append(editButton, deleteButton);
        row.appendChild(actions);

        patientTable.appendChild(row);
    });
}

// CREATE and UPDATE: Save patient
patientForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("patientId").value;

    const patient = {
        id: id ? Number(id) : Date.now(),
        name: document.getElementById("name").value.trim(),
        age: Number(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value.trim(),
        disease: document.getElementById("disease").value.trim()
    };

    if (id) {
        patients = patients.map(p =>
            p.id === Number(id) ? patient : p
        );
        alert("Patient updated successfully!");
    } else {
        patients.push(patient);
        alert("Patient added successfully!");
    }

    savePatients();
    displayPatients();
    patientForm.reset();

    document.getElementById("patientId").value = "";
    document.getElementById("formTitle").textContent = "Add New Patient";
    document.getElementById("submitBtn").textContent = "Add Patient";
});

// UPDATE: Edit patient
function editPatient(id) {
    const patient = patients.find(p => p.id === id);

    if (!patient) return;

    document.getElementById("patientId").value = patient.id;
    document.getElementById("name").value = patient.name;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("disease").value = patient.disease;

    document.getElementById("formTitle").textContent = "Update Patient";
    document.getElementById("submitBtn").textContent = "Update Patient";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// DELETE: Remove patient
function deletePatient(id) {
    if (confirm("Are you sure you want to delete this patient?")) {
        patients = patients.filter(p => p.id !== id);

        savePatients();
        displayPatients();

        alert("Patient deleted successfully!");
    }
}

// SEARCH: Find patient
document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchValue) ||
        patient.phone.includes(searchValue) ||
        patient.disease.toLowerCase().includes(searchValue)
    );

    displayPatients(filteredPatients);
});

// Initial display
displayPatients();
