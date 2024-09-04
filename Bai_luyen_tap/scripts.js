class Student {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManagement {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.loadStudents();
    }

    loadStudents() {
        const tbody = document.querySelector('#studentTable tbody');
        tbody.innerHTML = '';

        this.students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="editStudent('${student.id}')">Edit</button>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    addStudent(student) {
        this.students.push(student);
        this.saveStudents();
        this.loadStudents();
    }

    updateStudent(updatedStudent) {
        const index = this.students.findIndex(student => student.id === updatedStudent.id);
        if (index !== -1) {
            this.students[index] = updatedStudent;
            this.saveStudents();
            this.loadStudents();
        }
    }

    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.saveStudents();
        this.loadStudents();
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }
}

const studentManagement = new StudentManagement();

document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('studentId').value || Date.now().toString();
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;

    const student = new Student(id, name, gender, dob, hometown);

    if (document.getElementById('studentId').value) {
        studentManagement.updateStudent(student);
    } else {
        studentManagement.addStudent(student);
    }

    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
});

function editStudent(id) {
    const student = studentManagement.students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('gender').value = student.gender;
        document.getElementById('dob').value = student.dob;
        document.getElementById('hometown').value = student.hometown;
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        studentManagement.deleteStudent(id);
    }
}