/**
 * course.route.js
 *
 * Contains all the routes to access the courses
 * in the database.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import express from "express";
import {createCourse, deleteCourse, getCourse, getCourses, updateCourse} from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
