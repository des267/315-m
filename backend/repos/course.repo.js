/**
 * course.repo.js
 *
 * Directly interacts with the database; specifically the
 * course collection. Performs CRUD operations and returns
 * the results to the controllers.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import Course from "../models/course.model.js";

export const getCoursesFromRepo = async (query) => {
	try {
		return await Course.find(query);
	} catch (e) {
		throw e;
	}
}

export const updateCourseInRepo = async (query, update) => {
	try {
		return await Course.findOneAndUpdate(
			{...query},
			{...update},
			{new: true}
		).lean()
	} catch (e) {
		throw e;
	}
}

export const deleteCourseFromRepo = async (query) => {
	try {
		return await Course.findOneAndDelete({...query});
	} catch (e) {
		throw e;
	}
}

export const createCourseInRepo = async (payload) => {
	try {
		const newCourse = new Course(payload);
		return await newCourse.save();
	} catch (e) {
		throw e;
	}
}