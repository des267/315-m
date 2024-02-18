import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseTable from "./components/coursetable/coursetable.component";
import {useEffect, useState} from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const urlCourses = '//localhost:8001/courses/';
const urlStudents = '//localhost:8001/students/';

function App() {
	const [activeStudentID, setActiveStudentID] = useState(1);
	const [activeStudent, setActiveStudent] = useState({});
	const [courses, setCourses] = useState([]);
	const [filteredCourses, setFilteredCourses] = useState([]);
	const [enrolledCourses, setEnrolledCourses] = useState([]);
	const [students, setStudents] = useState([]);
	const [updateCounter, setUpdateCounter] = useState(0);

	// Called when app first starts
	useEffect(() => {
		const getData = async () => {
			const response1 = await axios(urlStudents);
			const response2 = await axios(urlCourses);
			const response3 = await axios(urlStudents + activeStudentID);
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
		const filteredCourses = courses?.filter( (course) => !activeStudent["courses"].includes(course["_id"]));
		setFilteredCourses(filteredCourses);

		const filteredEnrolled = courses?.filter( (course) => activeStudent["courses"].includes(course["_id"]));
		setEnrolledCourses(filteredEnrolled);
	}, [activeStudent]);

	const studentSelectHandler = e => {
		setActiveStudentID(Number.parseInt(e.target.id));
	}

	const enrollHandler = e => {
		const courseID = Number.parseInt(e.target.id);
		const newCourse = courses.find((course) => (course["id"] === courseID));
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

	return (
		<div className="App">
			<div>
				<h1>COURSE REGISTRATION</h1>
				<DropdownButton id="dropdown-basic-button" title="Select Student Name">
					{students.map((student) => (
						<Dropdown.Item id={student.id} href={"#/action-" + student.id} onClick={studentSelectHandler}>{student.name}</Dropdown.Item>
					))}
				</DropdownButton>
				<div>
					<h6>Course List</h6>
					<CourseTable courses={filteredCourses} activeStudent={activeStudent} isEnrolled={false} handler={enrollHandler}/>
				</div>
				<h1>STUDENT INFORMATION</h1>
				<div>
					<h6>Student List</h6>
					<CourseTable courses={enrolledCourses} activeStudent={activeStudent} isEnrolled={true} handler={unEnrollHandler}/>
				</div>
			</div>
		</div>
	);
}

export default App;
