/* eslint-disable camelcase */
import { DEFAULT_PAYLOAD_LIMIT } from "../config";
import { Favorite } from "../models/Favorite";
import Log from "../resources/Log";

class FavoriteController {
  public static async getFavorites (req, res) {
    const favorite = await Favorite.find().limit(DEFAULT_PAYLOAD_LIMIT).lean();
    Log.info(favorite);
    res.json({ favorite });
  }

  public static async getFavoriteByProfileId (req, res) {
    Log.info(req.params);
    let query = {};
    const { profile_id } = req.params;
    query = { profile_id };
    Log.info({ query });
    const data = await Favorite.find(query).lean();
    res.json(data);
  }
}

export default FavoriteController;
