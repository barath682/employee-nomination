import mongoose from "mongoose";

const NominationSchema = new mongoose.Schema({
  nomineeName: String,
  nominatedBy: String,
  reason: String,
  month: String,
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Nomination || mongoose.model("Nomination", NominationSchema);