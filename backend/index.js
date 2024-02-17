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
import cors from "cors";
import connectDB from "./services/database.service.js";
import studentRoute from "./routes/students.route.js";
import courseRoute from "./routes/courses.route.js";
import homeRoute from "./routes/home.route.js";

const app = express();
const port = 8001;

// Connect to database
connectDB();

// Make express use body-parser json
app.use(bodyParser.json());

// Enable All CORS requests
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use("/", homeRoute);
app.use("/students", studentRoute);
app.use("/courses", courseRoute);

// Configure listening
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
