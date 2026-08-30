import express from "express";
import upload from "../middleware/upload.js";

import {
  createInspection,
  getAllInspections,
} from "../controllers/inspection.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.single("attachment"),
  createInspection
);

router.get("/", getAllInspections);

export default router;
