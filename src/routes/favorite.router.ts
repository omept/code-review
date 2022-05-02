import { Router } from "express";
import { Favorite } from "../models/Favorite";

export const router = Router();

router.get("/api/favorite", async (req, res) => {
  const favorite = await Favorite.find().lean();
  console.log(favorite);
  res.json({ favorite });
});

router.get("/api/favorite/:profile_id", async (req, res) => {
  console.log(req.params);
  let query = {};
  // eslint-disable-next-line camelcase
  const { profile_id } = req.params;
  // eslint-disable-next-line camelcase
  query = { profile_id };
  console.log(query);
  const data = await Favorite.find(query).lean();
  res.json(data);
});
