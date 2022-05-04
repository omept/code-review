import { param } from "express-validator";

class FavouriteRouteSchema {
  getFavoritesByProfileIdScheme () {
    const scheme = [
      param("profileId").isString().withMessage("invalid profile id format")
    ];

    return scheme;
  }
}

export default new FavouriteRouteSchema();
