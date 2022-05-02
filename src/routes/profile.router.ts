import { Router } from "express";
import ProfileController from "../controllers/ProfileController";

export const router = Router();

router.get("/api/profile", ProfileController.getProfiles);
router.post("/api/profile", ProfileController.queryProfiles);
