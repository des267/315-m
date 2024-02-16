/**
 * students.repo.js
 *
 * Directly interacts with the database; specifically the
 * student collection. Performs CRUD operations and returns
 * the results to the controllers.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import Student from "../models/student.model.js";

export const getStudentsFromRepo = async (query) => {
	try {
		return await Student.find(query);
	} catch (e) {
		throw e;
	}
}

export const updateStudentInRepo = async (query, update) => {
	try {
		return await Student.findOneAndUpdate(
			{...query},
			{...update},
			{new: true}
		).lean()
	} catch (e) {
		throw e;
	}
}

export const deleteStudentFromRepo = async (query) => {
	try {
		return await Student.findOneAndDelete({...query});
	} catch (e) {
		throw e;
	}
}

export const createStudentInRepo = async (payload) => {
	try {
		const newStudent = new Student(payload);
		return await newStudent.save();
	} catch (e) {
		throw e;
	}
}