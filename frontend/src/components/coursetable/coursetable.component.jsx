/**
 * coursetable.component.jsx
 *
 * Holds a list of courses.
 *
 * Author: Desmond Stular
 * Date: February 17, 2024
 */

import Table from "react-bootstrap/Table";
import CourseRow from "../courserow/courserow.component";
import Spinner from 'react-bootstrap/Spinner';
import './coursetable.component.css';

const CourseTable = ({ activeStudent, courses, isEnrolled, handler }) => {
	// If data not loaded from server, put loading spinners
	if (courses.length === 0 && Object.keys(activeStudent).length === 0) {
		return (
			<div style={{justifyContent: "center"}}>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}
	return (
		<div className={"table"}>
			<Table style={{outline: "red", borderStyle: "solid"}} striped bordered hover>
				<thead style={{position: "sticky", top: "-1px"}}>
				<th>id</th>
				<th>Course Name</th>
				<th>Department</th>
				<th>Time of Day</th>
				<th></th>
				</thead>
				<tbody>
				{courses.map(course => (
					<CourseRow course={course} isEnrolled={isEnrolled} handler={handler}/>
				))}
				</tbody>
			</Table>
		</div>
	);
};

export default CourseTable;