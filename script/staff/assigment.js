// Maximum allowed file size (5MB in bytes)
const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB

// Store the current username (this could be set dynamically when the user logs in)
let currentUser = "JohnDoe";  // Example user, replace this with actual dynamic value

// Function to handle file upload and validation
function handleFileUpload(event) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Please upload a file.");
        return;
    }

    const file = files[0];

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the 5MB limit. Please upload a smaller file.");
        return;
    }

    // File type validation (only PDFs)
    if (file.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
    }

    // Show file name preview
    previewFileName(file);
}

// Function to display the file name in the preview (instead of showing the actual PDF)
function previewFileName(file) {
    const previewContainer = document.getElementById('file-preview');
    previewContainer.innerHTML = "";  // Clear previous preview

    // Display the file name in the preview section
    const fileNameDisplay = document.createElement('div');
    fileNameDisplay.textContent = `Assignment_${file.name}`;
    
    previewContainer.appendChild(fileNameDisplay);
}

// Function to save PDF to localStorage for the current user
function savePdfToLocalStorage() {
    const fileInput = document.getElementById('pdf-upload');
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Please upload a file first.");
        return;
    }

    const file = files[0];

    const reader = new FileReader();

    reader.onloadend = function () {
        // Retrieve existing PDFs for the current user from localStorage
        let savedPdfs = JSON.parse(localStorage.getItem(`Assignment_${currentUser}`)) || [];

        // Push the new file with its name and base64 data to the array
        savedPdfs.push({
            name: file.name,
            data: reader.result
        });

        // Save the updated array back to localStorage under the unique key for the current user
        localStorage.setItem(`Assignment_${currentUser}`, JSON.stringify(savedPdfs));

        alert('Assignment Oploaded!');
        updateFilePreview(savedPdfs);  // Update the displayed file names
    };

    reader.readAsDataURL(file);  // Read file as base64
}

// Function to update the preview of saved file names for the current user
function updateFilePreview(savedPdfs) {
    const previewContainer = document.getElementById('file-preview');
    previewContainer.innerHTML = "";  // Clear previous preview

    // Display the names of all saved PDFs for the current user
    savedPdfs.forEach((pdf, index) => {
        const fileContainer = document.createElement('div');
        const fileNameDisplay = document.createElement('span');
        fileNameDisplay.textContent = `Assignment: ${pdf.name}`;
        
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = pdf.data;  // Base64 data
        downloadLink.download = pdf.name;  // Use the file name for the download
        downloadLink.textContent = " (Download)";
        
        // Append the file name and download link to the container
        fileContainer.appendChild(fileNameDisplay);
        fileContainer.appendChild(downloadLink);
        
        previewContainer.appendChild(fileContainer);
    });
}

// Function to download a saved PDF for the current user (when clicking the download link)
function downloadPdf(pdfData, fileName) {
    const link = document.createElement('a');
    link.href = pdfData;  // Use the base64 data of the file
    link.download = fileName;  // Use the saved file name as the download name
    link.click();
}

// Function to clear saved PDFs for the current user from localStorage
function clearSavedPdf() {
    localStorage.removeItem(`Assignment_${currentUser}`);
    alert('Saved PDFs cleared from localStorage for this user!');
    updateFilePreview([]);  // Clear the preview display
}

// Add event listener to handle file upload
document.getElementById('pdf-upload').addEventListener('change', handleFileUpload);

// On page load, retrieve the saved PDFs from localStorage and display them
window.addEventListener('load', function() {
    const savedPdfs = JSON.parse(localStorage.getItem(`Assignment_${currentUser}`)) || [];
    updateFilePreview(savedPdfs);  // Display saved PDFs when the page loads
});
