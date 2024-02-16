/**
 * students.route.js
 *
 * Contains all the routes to access the students from
 * the database.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import express from "express";
import {
	createStudent,
	deleteStudent,
	getStudent,
	getStudents,
	updateStudent
} from "../controllers/students.controller.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
