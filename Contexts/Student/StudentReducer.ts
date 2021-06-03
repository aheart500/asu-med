import { Student } from "../../types";

export default function studentReducer(
  state: Student,
  action: { type: "SAVE"; payload: Partial<Student> }
) {
  switch (action.type) {
    case "SAVE":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
