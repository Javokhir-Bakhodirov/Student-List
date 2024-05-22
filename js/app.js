const form = document.getElementById("addStudentForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("age");
const studentListDiv = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Forma yuborilganda hodisani tinglash
form.onsubmit = function (event) {
	event.preventDefault();

	const firstName = firstNameInput.value;
	const lastName = lastNameInput.value;
	const age = ageInput.value;

	const newStudent = {
		firstName: firstName,
		lastName: lastName,
		age: age,
	};

	students.push(newStudent);
	localStorage.setItem("students", JSON.stringify(students));

	updateStudentList();

	firstNameInput.value = "";
	lastNameInput.value = "";
	ageInput.value = "";
};

function updateStudentList() {
	const students = JSON.parse(localStorage.getItem("students")) || [];

	studentListDiv.innerHTML = "";

	students.forEach((student, index) => {
		const studentElement = document.createElement("div");
		studentElement.textContent = `Ism: ${student.firstName}, Familiya: ${student.lastName}, Yosh: ${student.age}`;

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "O'chirish";
		deleteButton.onclick = function () {
			students.splice(index, 1);
			localStorage.setItem("students", JSON.stringify(students));

			updateStudentList();
		};

		studentElement.appendChild(deleteButton);
		studentListDiv.appendChild(studentElement);
	});
}

window.onload = function () {
	updateStudentList();
};
