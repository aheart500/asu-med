import { Schema, model, Document, Model } from "mongoose";

export interface StudentDocument extends Document {
  id: number;
  grades: number;
  password: string;
  matchesPassword: (password: string) => boolean;
}

export interface StudentModel extends Model<StudentDocument> {}
const StudentSchema = new Schema({
  id: Number,
  grades: Number,
  password: String,
});
StudentSchema.index({ grades: 1 });
StudentSchema.methods.matchesPassword = function (
  this: StudentDocument,
  password: string
): boolean {
  return password === this.password;
};

const User = model<StudentDocument, StudentModel>("Student", StudentSchema);
export default User;
