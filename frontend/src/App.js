import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseTable from "./components/coursetable/coursetable.component";
import {useEffect, useState} from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Searchbar from "./components/searchbar/searchbar.component";

// const urlCourses = process.env.URL_COURSES;
// const urlStudents = process.env.URL_STUDENTS;
// console.log(urlCourses);
// console.log(urlStudents);
const urlCourses = 'https://three15-midterm-backend.onrender.com/courses/';
const urlStudents = 'https://three15-midterm-backend.onrender.com/students/';

function App() {
	const [activeStudentID, setActiveStudentID] = useState(1);
	const [activeStudent, setActiveStudent] = useState({});
	const [courses, setCourses] = useState([]);
	const [filteredCourses, setFilteredCourses] = useState([]);
	const [enrolledCourses, setEnrolledCourses] = useState([]);
	const [students, setStudents] = useState([]);
	const [updateCounter, setUpdateCounter] = useState(0);
	const [courseSearchInput, setCourseSearchInput] = useState("");
	const [studentSearchInput, setStudentSearchInput] = useState("");

	// Called at app start and whenever a patch is processed
	useEffect(() => {
		const getData = async () => {
			const response1 = await axios(urlStudents);
			const response2 = await axios(urlCourses);
			const response3 = await axios(urlStudents + activeStudentID);

			// Sort list of students by name for dropdown display
			response1.data.sort((a, b) => {
				let fa = a.name.toLowerCase(),
					fb = b.name.toLowerCase();

				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			});

			setStudents(response1.data);
			setCourses(response2.data);
			setActiveStudent(response3.data[0]);
		};
		getData();
	}, [updateCounter]);

	useEffect(() => {
		const getStudent = async () => {
			const response = await axios(urlStudents + activeStudentID);
			setActiveStudent(response.data[0]);
		};
		getStudent();
	}, [activeStudentID]);

	useEffect(() => {
		const availableCourses = courses.filter( (course) => !activeStudent["courses"].includes(course["_id"]));
		const filteredCourses = availableCourses.filter((course) => course.startTime.includes(courseSearchInput));
		setFilteredCourses(filteredCourses);

		const studentEnrolled = courses.filter( (course) => activeStudent["courses"].includes(course["_id"]));
		const filteredEnrolled = studentEnrolled.filter((course) => course.startTime.includes(studentSearchInput));
		setEnrolledCourses(filteredEnrolled);
	}, [activeStudent, courseSearchInput, studentSearchInput]);

	const hasTimeConflict = (course) => {
		for (const taken of enrolledCourses) {
			if (taken.startTime === course.startTime) {
				return true;
			}
		}
		return false;
	}

	// If user clicks the enroll button, adds student to course if no time conflict
	const enrollHandler = e => {
		const courseID = Number.parseInt(e.target.id);
		const newCourse = courses.find((course) => (course["id"] === courseID));

		// If there is a time conflict, alert and stop
		if (hasTimeConflict(newCourse)) {
			alert("Failed: You cannot enroll for two classes with the same start time.");
			return;
		}

		// No time conflict so add student and course obj ids to each other
		newCourse["students"].push(activeStudent["_id"]);
		const newStudent = activeStudent;
		activeStudent["courses"].push(newCourse["_id"]);

		// Update course and student in database; adds objects ids to each other
		const updateCourseAndStudent = async () => {
			const response1 = await axios.patch(urlCourses + courseID, newCourse);
			const response2 = await axios.patch(urlStudents + activeStudentID, newStudent);
		}
		updateCourseAndStudent();

		// Increment counter to load new database courses
		setUpdateCounter(updateCounter + 1);
	}

	// If user clicks the un-enroll button, removes student from course
	const unEnrollHandler = e => {
		// Remove both course, students object ids from each other
		const courseID = Number.parseInt(e.target.id);
		const newCourse = courses.find((course) => (course["id"] === courseID));
		const index1 = newCourse["students"].indexOf(activeStudent["_id"]);
		newCourse["students"].splice(index1, 1);
		const newStudent = activeStudent;
		const index2 = activeStudent["courses"].indexOf(newCourse["_id"]);
		newStudent["courses"].splice(index2, 1);

		// Update objects in database
		const updateCourseAndStudent = async () => {
			const response1 = await axios.patch(urlCourses + courseID, newCourse);
			const response2 = await axios.patch(urlStudents + activeStudentID, newStudent);
		}
		updateCourseAndStudent();

		// Increment counter to pull new data from database
		setUpdateCounter(updateCounter + 1);
	}

	// If the user changes the student from dropdown
	const studentSelectHandler = e => {
		setActiveStudentID(Number.parseInt(e.target.id));
	}

	// Whenever the course section searchbar is changed
	const courseSearchHandler = (e) => {
		setCourseSearchInput(e.target.value);
	}

	// Whenever the student section searchbar is changed
	const studentSearchHandler = (e) => {
		setStudentSearchInput(e.target.value);
	}

	return (
		<div className="App">
			<div className={"parentContainer"}>
				<h1>COURSE REGISTRATION</h1>
				<div className={"coursesContainer"}>
					<h6>Course List</h6>
					<DropdownButton id="dropdown-basic-button" title={"Student: " + activeStudent.name} style={{marginBottom: "1vh"}}>
						<Dropdown.Header>Select a student</Dropdown.Header>
						<Dropdown.Menu style={{maxHeight: '50vh', overflowY: "auto"}}>
							{students.map((student) => (
								<Dropdown.Item id={student.id} href={"#/action-" + student.id}
											   onClick={studentSelectHandler}>{student.name}</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</DropdownButton>
					<Searchbar placeholder={"Search For Time"} handler={courseSearchHandler}/>
					<CourseTable courses={filteredCourses} activeStudent={activeStudent} isEnrolled={false}
								 handler={enrollHandler}/>
				</div>
			</div>
			<div className={"parentContainer"}>
				<h1>STUDENT INFORMATION</h1>
				<div className={"coursesContainer"}>
					<h6>Student List</h6>
					<Searchbar placeholder={"Search For Time"} handler={studentSearchHandler}/>
					<CourseTable courses={enrolledCourses} activeStudent={activeStudent} isEnrolled={true} handler={unEnrollHandler}/>
				</div>
			</div>
		</div>
	);
}

export default App;
