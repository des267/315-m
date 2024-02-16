/**
 * database.service.js
 *
 * Connects to the database.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import mongoose from "mongoose";

const localUrl = "localhost:3000/"
mongoose.set('strictQuery', true);

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL || localUrl, {dbName: "315M"});
		console.log("Connected to database");
	} catch (e) {
		console.log("Could not connect to database");
	}
};

export default connectDB;