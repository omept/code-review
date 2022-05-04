import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    profileId: Schema.Types.ObjectId,
    dateRecorded: Date,
    cryptocurrency: String,
    euros: Number,
    price: Number,
    quantity: Number
  },
  {
    timestamps: true
  }
);

export const Simulator = mongoose.model("Simulator", schema);
