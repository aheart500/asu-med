import { Schema, model, Document } from "mongoose";
import { EventDocument } from "./Event";

export interface FamilyDocument extends Document {
  name: string;
  events: Array<EventDocument>;
}
const FamilySchema = new Schema({
  name: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

const User = model<FamilyDocument>("Family", FamilySchema);
export default User;
