import { body, param } from "express-validator";

class SimulatorRouteSchema {
  public profileIdRule = param("profileId").custom((val) => {
    if (val.match(/^[0-9a-fA-F]{24}$/)) {
      return true;
    }
    return false;
  }).withMessage("invalid profile id format");

  getSimulatorByProfileIdScheme () {
    const scheme = [
      this.profileIdRule
    ];
    return scheme;
  }

  saveProfileIdSimulatorScheme () {
    const scheme = [
      this.profileIdRule,
      body("dateRecorded")
        .custom((value: string) => {
          const d = new Date(value);
          return Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime());
        }).withMessage("invalid date format for dateRecorded"),
      body("cryptocurrency").isString().withMessage("cryptocurrency must be a string"),
      body("euros").isNumeric().withMessage("euros must be numeric"),
      body("price").isNumeric().withMessage("price must be numeric"),
      body("quantity").isNumeric().withMessage("quantity must be numeric")
    ];

    return scheme;
  }
}

export default new SimulatorRouteSchema();
