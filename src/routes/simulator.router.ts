import { Router } from "express";
import SimulatorController from "../controllers/SimulatorController";

export const router = Router();

router.get("/api/simulator", SimulatorController.getSimulators);
router.get("/api/simulator/:profile_id", SimulatorController.getSimulatorsByProfileId);
router.post("/api/simulator/:profile_id", SimulatorController.saveProfileIdSimulator);
