import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    profileId: String,
    name: String,
    favorite1: String,
    favorite2: String,
    favorite3: String
  },
  {
    timestamps: true
  }
);

export const Favorite = mongoose.model("Favorite", schema);
