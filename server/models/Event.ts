import { Schema, model, Document, Model } from "mongoose";

export interface EventDocument extends Document {
  id: number;
  start: Date;
  end: Date;
  duration: number;
  title: string;
  description: string;
  family: number;
}
const EventSchema = new Schema({
  start: { type: Date, required: true },
  end: Date,
  duration: Number,
  title: { type: String, required: true },
  description: String,
  family: { type: Schema.Types.ObjectId, ref: "Family" },
});

EventSchema.index({ family: 1 });

const User = model<EventDocument>("Event", EventSchema);
export default User;
