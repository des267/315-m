/**
 * Contains the model/mongoose schema for a student
 * in the database.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
	{
		"id": {type: Number, required: true, unique: true},
		"name": {type: String, required: true},
		"email": String,
		"courses": [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course"
		}]
		},
	{strictQuery: true}
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;
