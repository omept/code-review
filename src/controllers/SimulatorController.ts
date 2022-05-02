import { Simulator } from "../models/Simulator";
import Log from "../resources/Log";
import { DEFAULT_PAYLOAD_LIMIT } from "../config";

class SimulatorController {
  public static async getSimulators (req, res) {
    const simulators = await Simulator.find().limit(DEFAULT_PAYLOAD_LIMIT).lean();
    Log.info(simulators);
    res.json({ simulators });
  }

  public static async getSimulatorsByProfileId (req, res) {
    Log.info("========== ");
    let query = {};
    // eslint-disable-next-line camelcase
    const { profile_id } = req.params;
    // eslint-disable-next-line camelcase
    Log.info({ profile_id });
    // eslint-disable-next-line camelcase
    query = { profile_id };
    const data = await Simulator.find(query).lean();
    res.json(data);
  }

  public static async saveProfileIdSimulator (req, res) {
    // eslint-disable-next-line camelcase
    const { profile_id } = req.params;
    const newData = {
      ...req.body,
      // eslint-disable-next-line camelcase
      profile_id
    };
    Log.info(newData);
    const simulator = await Simulator.create(newData);
    res.json(simulator);
  }
}

export default SimulatorController;
