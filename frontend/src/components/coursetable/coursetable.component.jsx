/**
 * coursetable.component.jsx
 *
 * Holds a list of courses.
 */

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {useQuery} from "@tanstack/react-query";
import {retrieveCourses} from "../../calls";

const CourseTable = ({ activeStudent }) => {
	const {data, error, isLoading} =
		useQuery({queryKey: ['courses'],
		queryFn: retrieveCourses});

	if (isLoading) {
		return (
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);
	}
	if (error) return <div>An error occurred: {error.message}</div>;

	return (
		<Table striped bordered hover>
			<thead>
			<th>id</th>
			<th>Course Name</th>
			<th>Department</th>
			<th>Time of Day</th>
			</thead>
			<tbody>
			{data.map(course => (
				<tr>
					<td>{course.id}</td>
					<td>{course.name}</td>
					<td>{course.department}</td>
					<td>{course.startTime}</td>
					<td><Button variant="success">Enroll</Button>{' '}</td>
				</tr>
			))}
			</tbody>
		</Table>
	);
};

export default CourseTable;