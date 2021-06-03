import { useReducer } from "react";
import { Student } from "../../types";
import StudentContext from "./StudentContext";
import StudentReducer from "./StudentReducer";

export default function StudentState({ children }) {
  const initialState: Student = null;
  const [state, dispatch] = useReducer(StudentReducer, initialState);

  const Save = (data: Partial<Student>) => {
    dispatch({ type: "SAVE", payload: data });
  };

  return (
    <StudentContext.Provider
      value={{
        State: state,
        Save,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
