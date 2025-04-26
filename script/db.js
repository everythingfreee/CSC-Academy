// Sample user data (database simulation)
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

// Function to simulate login
function login(userId, password) {
    // Simulate database lookup using email as user ID
    const user = database.find(user => user.id === userId);

    if (user && user.password === password) {
        alert(`Login successful! Welcome, ${user.name}.`);
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save user data to localStorage
        location.href = "/tamplates/studentLogin/dashboord.html"; // Correct redirect URL
    } else {
        alert("Login failed. Invalid student ID or password.");
    }
}
function al(){
    window.alert("Contact Admin for Password")
}

// Function to display user info if logged in
function displayUserInfo() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById("userName").textContent = loggedInUser.name;
        document.getElementById("userEmail").textContent = loggedInUser.email;
        document.getElementById("userId").textContent = loggedInUser.id; // Use id instead of studentId
        document.getElementById("userAgeDisplay").textContent = loggedInUser.age;
        document.getElementById("Studentclass").textContent = loggedInUser.rank;
        document.getElementById("s").textContent=loggedInUser.sw;
        if(loggedInUser.class==!"1"){

            location.href = "/tamplates/staffLogin/staffDash.html"; // Correct redirect URL
        
        }
        // Show logout button if user is logged in
        document.getElementById("logoutBtn").style.display = "block";
    } else {
        // Redirect to login if no user is logged in
        location.href = "/login.html";
    }
}

// Logout functionality
document.addEventListener('DOMContentLoaded', function() {
    // Attach the logout event listener after the page is fully loaded
    document.getElementById("logoutBtn").addEventListener("click", function() {
        alert("You have been logged out.");
        localStorage.removeItem('loggedInUser'); // Clear the user data from localStorage
        window.location.href = "/login.html";  // Replace with your actual login page URL
    });

    // Display user information if logged in
    displayUserInfo();
});

// Handle form submission and login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    
    const userId = document.getElementById("user").value; // Get value of email (user ID)
    const password = document.getElementById("password").value; // Get value of password
    
    // Basic validation (ensure fields aren't empty)
    if (!userId || !password) {
        alert("Please fill in both fields.");
        return;
    }
    
    // Call the login function
    login(userId, password);
});

