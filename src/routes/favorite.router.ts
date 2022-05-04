import { Router } from "express";
import FavoriteController from "../controllers/FavoriteController";

export const router = Router();

router.get("/api/favorite", FavoriteController.getFavorites);
router.get("/api/favorite/:profileId", FavoriteController.getFavoritesByProfileId);
