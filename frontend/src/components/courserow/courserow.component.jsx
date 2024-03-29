/**
 * courserow.component.jsx
 *
 * A component representing a row within one of the courses tables.
 *
 * Author: Desmond Stular
 * February 17, 2024
 */

import Button from "react-bootstrap/Button";

const CourseRow = ({ course, isEnrolled, handler }) => {
	const { id, name, department, startTime } = course;
	let variant = "success", placeholder = "Enroll";

	if (isEnrolled) {
		variant = "danger";
		placeholder = "Unenroll";
	}
	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{department}</td>
			<td>{startTime}</td>
			<td><Button id={id} variant={variant} onClick={handler}>{placeholder}</Button>{' '}</td>
		</tr>
	);
}

export default CourseRow;