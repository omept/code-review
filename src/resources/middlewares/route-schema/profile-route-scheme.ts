import { body } from "express-validator";

class ProfileRouteSchema {
  queryProfilesScheme () {
    const scheme = [
      body("name").isString().withMessage("name must be a string"),
      body("email").isEmail().withMessage("email must be a valid email"),
      body("nickname").optional().isString().withMessage("nickname must be a string")
    ];

    return scheme;
  }
}

export default new ProfileRouteSchema();
