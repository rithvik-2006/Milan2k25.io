// models/Event.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEvent extends Document {
  id: string;
  name: string;
  category: "Sports-Boys" | "Sports-Girls" | "Cultural" | "Technical";
  date: String;
  startTime: string;
  location: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Sports-Boys", "Sports-Girls", "Cultural", "Technical"],
      required: true,
    },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema, "events");


export default Event;
