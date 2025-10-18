//models/Leaderboard.ts
import mongoose, { Schema, model, Document } from "mongoose";

export interface ILeaderboard extends Document {
  sport: string;
  scores: {
    [hostel: string]: number;
  };
  updatedBy: string;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  sport: { type: String, required: true },
  scores: { type: Map, of: Number, required: true },
  updatedBy: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Leaderboard = model<ILeaderboard>("Leaderboard", LeaderboardSchema);
