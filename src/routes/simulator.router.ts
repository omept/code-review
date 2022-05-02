import { Router } from "express";
import { Simulator } from "../models/Simulator";

export const router = Router();

router.get("/api/simulator", async (req, res) => {
  const simulator = await Simulator.find().lean();
  console.log(simulator);
  res.json({ simulator });
});

router.get("/api/simulator/:profile_id", async (req, res) => {
  console.log("========== ");
  let query = {};
  // eslint-disable-next-line camelcase
  const { profile_id } = req.params;
  // eslint-disable-next-line camelcase
  console.log({ profile_id });
  // eslint-disable-next-line camelcase
  query = { profile_id };
  const data = await Simulator.find(query).lean();
  res.json(data);
});

router.post("/api/simulator/:profile_id", async (req, res) => {
  // eslint-disable-next-line camelcase
  const { profile_id } = req.params;
  const newData = {
    ...req.body,
    // eslint-disable-next-line camelcase
    profile_id
  };
  console.log(newData);
  const simulator = await Simulator.create(newData);
  res.json(simulator);
});
