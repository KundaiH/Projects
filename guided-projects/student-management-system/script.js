console.log('Student Mangement System is running');

const defaultStudents = [
    {
        id: 1,
        name: "John",
        course: "Computer Science",
        marks: 85
    },
    {
        id: 2,
        name: "Mary",
        course: "Business Management",
        marks: 78
    },
    {
        id: 3,
        name: "Peter",
        course: "Information Technology",
        marks: 92
    },
    {
        id: 4,
        name: "Sarah",
        course: "Computer Science",
        marks: 88
    },
    {
        id:5,
        name: "David",
        course: "Accounting",
        marks: 75
    }
];

let students = JSON.parse(localStorage.getItem("students")) || defaultStudents;
displayStudents();

let editingStudentId = null;

const studentFormButton = document.getElementById("submit-btn");

// adding a default parameter to the function so that it deplays the full list when called without any arguments
function displayStudents(studentArray = students) {

    const studentList = document.getElementById("student-list");

    studentList.innerHTML ="";
    //forEach look to iterate through the array and dynamically render information to the table
    studentArray.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML =`
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `
        studentList.appendChild(row);
    });

};

const searchInput = document.getElementById("search-input");
const courseFilter = document.getElementById("course-filter");

function filterStudents(){
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCourse = courseFilter.value;

    const filteredStudents = students.filter(student =>{

        const matchesName = student.name.toLowerCase().includes(searchValue);

        const matchesCourse = selectedCourse === ""|| student.course === selectedCourse;

        return matchesName && matchesCourse;
    });

    displayStudents(filteredStudents);

};

searchInput.addEventListener("input", filterStudents);
courseFilter.addEventListener("change", filterStudents);



const studentForm = document.getElementById("student-form");

studentForm.addEventListener("submit", function(event){

    event.preventDefault();

    const id = Number(document.getElementById("student-id").value);
    const name = document.getElementById("student-name").value;
    const course = document.getElementById("student-course").value;
    const marks = Number(document.getElementById("student-marks").value);

    //function for editing an existing student information in the table
    if(editingStudentId !== null){
        const student = students.find(student => student.id === editingStudentId);
        student.name = name;
        student.course = course;
        student.marks = marks;

        saveStudents();
        displayStudents();
        studentForm.reset();
        editingStudentId = null;
        studentFormButton.textContent = "Add Student";
        // retore the id input field to the default setting after editing
        document.getElementById("student-id").readOnly = false;
        //hiding cancelEdit button after editing
        document.getElementById("cancel-edit-btn").style.display = "none";
        return;
    }

    const existingStudents = students.some(student =>{
        return student.id === id;        
    });

    if(existingStudents){
        alert("Student id already exists");
        return;
        //id.value ="";
    }

    const newStudent = {
        id: id,
        name: name,
        course: course,
        marks: marks
    };

    students.push(newStudent);
    saveStudents();
    displayStudents();
    console.log(students);
    studentForm.reset();

    
});

function saveStudents(){
    localStorage.setItem("students", JSON.stringify(students));
}

function deleteStudent(id){
    const confirmDelete = confirm("Are you sure you wwant to delete this student?");

    if(!confirmDelete){
        return;
    }

    students = students.filter(student => student.id !== id);
    saveStudents();
    displayStudents();
}

function editStudent(id){

    
    const student = students.find(student => student.id === id)
    //check if student exists with the id value
    if(!student){
        alert("No Student Found with matching id");
        return;
    }
    //change text on form button when editing
    studentFormButton.textContent = "Update Student";

    //change the editingStudentId variable to the current 
    //student id being edited to show that editing is taking
    //place not a new entry
    editingStudentId = id;

    const idInput = document.getElementById("student-id");
    const nameInput = document.getElementById("student-name");
    const courseInput = document.getElementById("student-course");
    const marksInput = document.getElementById("student-marks");

    idInput.value = student.id;
    idInput.readOnly = true;
    nameInput.value = student.name;
    courseInput.value = student.course; 
    marksInput.value = student.marks;

    //code for cancel edit button
    const cancelEditButton = document.getElementById("cancel-edit-btn");
    cancelEditButton.style.display ="inline-block";

}

function cancelEdit(){
    studentForm.reset();
    editingStudentId = null;
    studentFormButton.textContent = "Add Student";
    document.getElementById("student-id").readOnly = false;
    document.getElementById("cancel-edit-btn").style.display = "none";
}

// const searchInput = document.getElementById("search-input");

// searchInput.addEventListener("input", function(){

//     const searchValue = searchInput.value.toLowerCase();
//     const filteredStudents = students.filter(student => {

//         return student.name.toLowerCase().includes(searchValue);
//     });

//     //filteredStudents();
//     displayStudents(filteredStudents);
// });

// const courseFilter = document.getElementById("course-filter");
// courseFilter.addEventListener("change", function(){
//     const selectedCourse = courseFilter.value;
//     const filteredStudents = students.filter(student =>{
//         return selectedCourse === "" || student.course === selectedCourse;
//     });
//     //filteredStudents();
//     displayStudents(filteredStudents);
// });

// const filteredStudents = students.filter(student => {

//     const matchesName = student.name
//         .toLowerCase()
//         .includes(searchValue);

//     const matchesCourse = selectedCourse === "" ||
//         student.course === selectedCourse;

//     return matchesName  && matchesCourse;

// });

// const searchInput = document.getElementById("search-input");
// const courseFilter = document.getElementById("course-filter");

// const searchAndFilterStudents = ()=>{
//     const filteredStudents = student.filter(student=>{

//     })
// }

