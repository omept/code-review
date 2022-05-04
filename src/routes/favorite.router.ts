import { Router } from "express";
import FavoriteController from "../controllers/FavoriteController";
import FavouriteRouteSchema from "../resources/middlewares/route-schema/favourite-route-scheme";
import ValidateRequestSchema from "../resources/middlewares/validate-request-schema";

export const router = Router();

router.get("/api/favorite", FavoriteController.getFavorites);
router.get("/api/favorite/:profileId", FavouriteRouteSchema.getFavoritesByProfileIdScheme(), ValidateRequestSchema.validate, FavoriteController.getFavoritesByProfileId);
