/**
 * course.model.js
 *
 * Contains the model/mongoose schema for a course
 * in the database.
 */

import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
	{
		"id": {type: Number, required: true, unique: true},
		"name": {type: String, required: true},
		"department": {type: String, required: true},
		"startTime": {type: String, required: true},
		"students": [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student"
		}]
	},
	{strictQuery: true}
);

const Course = new mongoose.model("Course", CourseSchema);

export default Course;