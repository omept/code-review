/* eslint-disable quotes */
import mongoose from "mongoose";
import { Profile } from "../models/Profile";
import { Simulator } from "../models/Simulator";
import { Favorite } from "../models/Favorite";
import { DBURL } from "../config";

(async () => {
  mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const profile = new Profile({
    name: `String`,
    email: `String`,
    capital: `123`,
    divisa: `String`,
    preferedCryptocurrency: `String`
  });
  const seedProfile = await profile.save();

  const query = { _id: seedProfile.id };
  const idProfile = await Profile.findOne(query).then((e) => {
    return e?._id;
  });

  const simulator = new Simulator({
    profileId: idProfile,
    name: `String`,
    startDate: `01/05/2021`,
    checkDate: `01/05/2021`,
    cryptocurrency: `String`,
    divisa: `String`,
    cryptoPriceStart: `123`,
    cryptoPriceCheck: `123`
  });
  await simulator.save();

  const favorite = new Favorite({
    profileId: idProfile,
    name: `String`,
    favorite1: `String`,
    favorite2: `String`,
    favorite3: `String`
  });
  await favorite.save();

  mongoose.disconnect();
})();
