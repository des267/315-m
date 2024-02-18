/**
 * database.service.js
 *
 * Connects to the database.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import mongoose from "mongoose";

const localUrl = "mongodb://localhost:27017/"
mongoose.set('strictQuery', true);

const connectDB = async () => {
	try {
		await mongoose.connect(localUrl || process.env.DATABASE_URL, {dbName: "315m"});
		console.log("Connected to database");
	} catch (e) {
		console.log("Could not connect to database");
	}
};

export default connectDB;
