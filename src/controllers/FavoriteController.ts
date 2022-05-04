import { Request, Response } from "express";
import { DEFAULT_PAYLOAD_LIMIT } from "../config";
import { Favorite } from "../models/Favorite";
import Log from "../resources/log/Log";

class FavoriteController {
  public async getFavorites (req: Request, res: Response) {
    const favorite = await Favorite.find().limit(DEFAULT_PAYLOAD_LIMIT).lean();
    Log.info({ favorite, description: "getFavorites response" });
    res.json({ favorite });
  }

  public async getFavoritesByProfileId (req: Request, res: Response) {
    Log.info({ params: req.params, description: "getFavoritesByProfileId Params" });
    let query = {};
    const { profileId } = req.params;
    query = { profileId };
    Log.info({ query, description: "getFavoritesByProfileId Query" });
    const data = await Favorite.find(query).lean();
    res.json(data);
  }
}

export default new FavoriteController();
