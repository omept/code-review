import { Request, Response } from "express";
import { Profile } from "../models/Profile";
import Log from "../resources/log/Log";
import { DEFAULT_PAYLOAD_LIMIT } from "../config";

class ProfileController {
  public async getProfiles (req: Request, res: Response) {
    const profile = await Profile.find().limit(DEFAULT_PAYLOAD_LIMIT).lean();
    Log.info(profile);
    res.json({ profile });
  }

  public async queryProfiles (req: Request, res: Response) {
    let { email, name, nickname } = req.body;
    if (!nickname) {
      nickname = "";
    }
    let profile = await Profile.findOne({
      $or: [{ email }, { nickname }]
    }).exec();

    if (!profile) {
      profile = await Profile.create({ name, email, nickname });
    }

    res.json(profile);
  }
}

export default new ProfileController();
