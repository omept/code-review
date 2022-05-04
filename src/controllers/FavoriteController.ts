import { Request, Response } from "express";
import { DEFAULT_PAYLOAD_LIMIT } from "../config";
import { Favorite } from "../models/Favorite";
import Log from "../resources/Log";

class FavoriteController {
  public async getFavorites (req: Request, res: Response) {
    const favorite = await Favorite.find().limit(DEFAULT_PAYLOAD_LIMIT).lean();
    Log.info(favorite);
    res.json({ favorite });
  }

  public async getFavoritesByProfileId (req: Request, res: Response) {
    Log.info(req.params);
    let query = {};
    const { profileId } = req.params;
    query = { profileId };
    Log.info({ query });
    const data = await Favorite.find(query).lean();
    res.json(data);
  }
}

export default new FavoriteController();
