/**
 * index.js
 *
 * Launches the backend of the application that lets
 * the front end interact with the database.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import express from "express";
import bodyParser from "body-parser";
import connectDB from "./services/database.service.js";
import studentRoute from "./routes/student.route.js";
import courseRoute from "./routes/course.route.js";

const app = express();
const port = 3000;

// Connect to database
connectDB();

// Make express use body-parser json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use("/student", studentRoute);
app.use("/course", courseRoute);

// Configure listening
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});