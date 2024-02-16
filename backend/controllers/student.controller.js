/**
 * student.controller.js
 *
 * Contains the controller functions for sending the
 * students from the database accessed via the repo
 * functions
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import {
	createStudentInRepo,
	deleteStudentFromRepo,
	getStudentsFromRepo,
	updateStudentInRepo
} from "../repos/student.repo.js";

export const getStudents = async (req, res, next) => {
	try {
		const students = await getStudentsFromRepo();
		res.status(200).send(students);
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO GET STUDENTS: ${e.message}`);
	}
}

export const getStudent = async (req, res, next) => {
	const {id} = req.params;
	try {
		const student = await getStudentsFromRepo({id: id});
		res.status(200).send(student);
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO GET STUDENT: ${e.message}`);
	}
}

export const updateStudent = async (req, res, next) => {
	const {id} = req.params;
	const {body} = req;
	try {
		const student = await updateStudentInRepo({id: id}, body);
		res.status(200).send(student);
	} catch (e) {
		next(e);
		res.status(500).send(`FAILED TO PATCH STUDENT: ${e.message}`);
	}
}

export const deleteStudent = async (req, res, next) => {
	const {id} = req.params;
	try {
		const studentDeleted = await deleteStudentFromRepo({id: id});
		if (studentDeleted) {
			res.status(204).send();
		} else {
			res.status(404).send(`FAILED TO DELETE STUDENT ${id}:`);
		}
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO DELETE STUDENT: ${e.message}`);
	}
}

export const createStudent = async (req, res, next) => {
	const body = req;
	try {
		const student = await createStudentInRepo({body});
		console.log("New Student:\n", student);
		res.status(200).send(student);
	} catch (e) {
		next();
		res.status(500).send(`FAILED TO CREATE STUDENT: ${e.message}`)
	}
}