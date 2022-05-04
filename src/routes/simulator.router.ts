import { Router } from "express";
import SimulatorController from "../controllers/SimulatorController";
import SimulatorRouteSchema from "../resources/middlewares/route-schema/simulator-route-scheme";
import ValidateRequestSchema from "../resources/middlewares/validate-request-schema";

export const router = Router();

router.get("/api/simulator", SimulatorController.getSimulators);
router.get("/api/simulator/:profileId", SimulatorRouteSchema.getSimulatorByProfileIdScheme(), ValidateRequestSchema.validate, SimulatorController.getSimulatorsByProfileId);
router.post("/api/simulator/:profileId", SimulatorRouteSchema.saveProfileIdSimulatorScheme(), ValidateRequestSchema.validate, SimulatorController.saveProfileIdSimulator);
