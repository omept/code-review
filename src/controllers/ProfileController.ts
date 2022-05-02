import { Profile } from "../models/Profile";
import Log from "../resources/Log";
import { DEFAULT_PAYLOAD_LIMIT } from "../config";

class ProfileController {
  public static async getProfiles (req, res) {
    const profile = await Profile.find().limit(DEFAULT_PAYLOAD_LIMIT).lean();
    Log.info(profile);
    res.json({ profile });
  }

  public static async queryProfiles (req, res) {
    const { email, name, nickname } = req.body;

    let profile = await Profile.findOne({
      $or: [{ email }, { nickname }]
    }).exec().lean();

    if (!profile) {
      profile = await Profile.create({ name, email, nickname });
    }

    res.json(profile);
  }
}

export default ProfileController;
