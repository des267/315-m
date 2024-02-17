import axios from "axios";

const urlCourses = '//localhost:8001/courses/';
const urlStudents = '//localhost:8001/students/';

export const retrieveCourses = async () => {
	const response = await axios(urlCourses);
	console.log(response.data);
	return response.data;
}

export const retrieveStudents = async () => {
	const response = await axios.get(urlStudents);
}