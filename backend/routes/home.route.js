/**
 * home.route.js
 *
 * Contains the route to the home of the backend. Returns
 * a message indicating the server is alive.
 *
 * Author: Desmond Stular
 * Date: Feb 16, 2024
 */

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
	res.status(200).send("Server is live");
});

export default router;
