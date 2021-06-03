import { Schema, model, Document, Model } from "mongoose";
import { hash, compare } from "bcrypt";
export interface StudentDocument extends Document {
  id: number;
  grades: number;
  password: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

export interface StudentModel extends Model<StudentDocument> {
  hash: (password: string) => Promise<string>;
}
const StudentSchema = new Schema({
  id: Number,
  grades: Number,
  password: String,
});
StudentSchema.pre("save", async function (this: StudentDocument) {
  if (this.isModified("password")) {
    this.password = await User.hash(this.password);
  }
});
StudentSchema.statics.hash = (password: string): Promise<string> => hash(password, 10);

StudentSchema.index({ grades: 1 });
StudentSchema.methods.matchesPassword = function (
  this: StudentDocument,
  password: string
): Promise<boolean> {
  return compare(password, this.password);
};

const User = model<StudentDocument, StudentModel>("Student", StudentSchema);
export default User;
