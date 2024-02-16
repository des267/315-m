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

const router = express.Router();

router.get("/");
router.get("/:id");
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;
