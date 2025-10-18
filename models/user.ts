//models/user.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for User
export interface IUser extends Document {
  uid: string;
  email: string;
  name?: string;
  provider: "email" | "google";
  hostel?: string; // added hostel
  preferredCategories?: ("Sports-Boys" | "Sports-Girls" | "Cultural" | "Technical")[];
  preferredEventIds?: string[]; // added preferredEventIds
}

// Mongoose schema
const UserSchema: Schema<IUser> = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  provider: { type: String, enum: ["email", "google"], required: true },
  hostel: { type: String }, // added hostel
  preferredCategories: {
    type: [String],
    enum: ["Sports-Boys", "Sports-Girls", "Cultural", "Technical"],
    default: [],
  },
  preferredEventIds: {
    type: [String],
    default: [],
  },
});

// Export User model
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
