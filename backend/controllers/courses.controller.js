/**
 * courses.controller.js
 *
 * Contains the controller functions for returning
 * the courses retrieved from the database via the
 * repo functions.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */
import {
	createCourseInRepo,
	deleteCourseFromRepo,
	getCoursesFromRepo,
	updateCourseInRepo
} from "../repos/courses.repo.js";


export const getCourses = async (req, res, next) => {
	try {
		const courses = await getCoursesFromRepo();
		res.status(200).send(courses);
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO GET COURSES: ${e.message}`);
	}
}

export const getCourse = async (req, res, next) => {
	const {id} = req.params;
	try {
		const course = await getCoursesFromRepo({id: id});
		res.status(200).send(course);
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO GET COURSE: ${e.message}`);
	}
}

export const updateCourse = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const course = await updateCourseInRepo({id: id}, body);
		res.status(200).send(course);
	} catch (e) {
		next(e);
		res.status(500).send(`FAILED TO PATCH COURSE: ${e.message}`);
	}
}

export const deleteCourse = async (req, res, next) => {
	const {id} = req.params;
	try {
		const courseDeleted = await deleteCourseFromRepo({id: id});
		if (courseDeleted) {
			res.status(204).send();
		} else {
			res.status(404).send(`FAILED TO DELETE COURSE ${id}:`);
		}
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO DELETE COURSE: ${e.message}`);
	}
}

export const createCourse = async (req, res, next) => {
	const {body} = req;
	try {
		const course = await createCourseInRepo(body);
		console.log("New Course:\n", course);
		res.status(200).send(course);
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO CREATE COURSE: ${e.message}`)
	}
}