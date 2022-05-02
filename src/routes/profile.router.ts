import { Router } from "express";
import { Profile } from "../models/Profile";

export const router = Router();

router.get("/api/profile", async (req, res) => {
  const profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
});

router.post("/api/profile", async (req, res) => {
  const { email, name, nickname } = req.body;

  let profile = await Profile.findOne({
    $or: [{ email }, { nickname }]
  }).exec().lean();

  if (!profile) {
    profile = await Profile.create({ name, email, nickname });
  }

  res.json(profile);
});
