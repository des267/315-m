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

const CourseTable = ({ activeStudent, courses, isEnrolled, handler }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<th>id</th>
				<th>Course Name</th>
				<th>Department</th>
				<th>Time of Day</th>
			</thead>
			<tbody>
				{courses.map(course => (
					<CourseRow course={course} isEnrolled={isEnrolled} handler={handler}/>
				))}
			</tbody>
		</Table>
	);
};

export default CourseTable;