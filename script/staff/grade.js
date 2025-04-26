// Import the database from db.js
const database = [
    {
        id: "CSC20251231",
        name: "John ",
        email: "johndoe@example.com",
        password: "12345678",
        rank:"Student",
        class:"JSS 1",
        age: 16

    },
    {
        id: "CSC20251232",
        name: "Jane Smith",
        email: "janesmith@example.com",
        password: "12345678",
        rank:"Student",
        class:"JSS 2",
        age: 17
    },
    {
        id: "CSC20251233",
        name: "Alex Johnson",
        email: "alexjohnson@example.com",
        password: "12345678",
        rank:"Student",
        class:"JSS 1",
        age: 14
    },
    {
        id: "CSC20251234",
        name: "Sadiq Ibrahim",
        email: "Sadiqibahimmuhammad@example.com",
        rank:"Student",
        class:"JSS 1",
        password: "12345678",
        age: 14
    },
    {
        id: "CSC20251234",
        name: "Aliyu Ibrahim",
        email: "aliyuibrahim@example.com",
        rank:"Student",
        class:"JSS 1",
        password: "12345678",
        age: 12
    },
    
    {
        id: "CSCS1",
        name: "Ibrahim Sani",
        email: "saniibrahim@example.com",
        rank:"Staff",
        password: "12345678",
        age: 35,
        sw:2,
        class:""
    
    },
    {
        id: "CSCS2",
        name: "Aliyu Isa",
        email: "aliyuisa@example.com",
        rank:"Staff",
        password: "12345678",
        age: 27,
        sw:2,
        class:""
    },
];
// Filter out only students from the database
const students = database.filter(user => user.rank === "Student");

// Populate the student dropdown with student IDs and names
window.addEventListener('load', () => {
    const studentSelect = document.getElementById('student-select');

    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id; // Use student ID
        option.textContent = student.name;  // Display student name
        studentSelect.appendChild(option);
    });
});

// Function to save grade to localStorage
function saveGradeToLocalStorage() {
    const fileInput = document.getElementById('pdf-upload');
    const studentSelect = document.getElementById('student-select');
    const file = fileInput.files[0];
    const studentId = studentSelect.value;

    if (file && studentId) {
        const reader = new FileReader();

        reader.onloadend = function () {
            // Retrieve existing grades for the student from localStorage
            let grades = JSON.parse(localStorage.getItem(studentId)) || [];

            // Add the new grade to the list
            grades.push({
                fileName: file.name,
                fileData: reader.result
            });

            // Save the updated grades back to localStorage
            localStorage.setItem(studentId, JSON.stringify(grades));

            // Display the saved grades
            displaySavedGrades(studentId);
        };

        // Read the file as a data URL (base64 encoded string)
        reader.readAsDataURL(file);
    } else {
        alert('Please select a student and upload a grade file.');
    }
}

// Function to display the saved grades for a selected student
function displaySavedGrades(studentId) {
    const gradeList = document.getElementById('grade-list');
    gradeList.innerHTML = ''; // Clear the current list

    // Retrieve the saved grades from localStorage
    const grades = JSON.parse(localStorage.getItem(studentId)) || [];

    // Display each saved grade
    grades.forEach(grade => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${grade.fileName}</span>
            <a href="${grade.fileData}" download="${grade.fileName}">Download</a>
        `;
        gradeList.appendChild(li);
    });
}

// Function to load and display grades for the selected student
document.getElementById('student-select').addEventListener('change', (e) => {
    const studentId = e.target.value;
    if (studentId) {
        displaySavedGrades(studentId);
    }
});

// Function to clear the saved grades for a selected student
function clearGrades() {
    const studentSelect = document.getElementById('student-select');
    const studentId = studentSelect.value;

    if (studentId) {
        // Remove the student's grades from localStorage
        localStorage.removeItem(studentId);

        // Clear the displayed grades from the UI
        displaySavedGrades(studentId);

        alert("Grades cleared for the selected student.");
    } else {
        alert("Please select a student to clear grades.");
    }
}
