import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import ProfileRouteSchema from "../resources/middlewares/route-schema/profile-route-scheme";
import ValidateRequestSchema from "../resources/middlewares/validate-request-schema";

export const router = Router();

router.get("/api/profile", ProfileController.getProfiles);
router.post("/api/profile", ProfileRouteSchema.queryProfilesScheme(), ValidateRequestSchema.validate, ProfileController.queryProfiles);
