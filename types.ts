export interface SavingFormValues {
  id: string;
  password: string;
  grades: string;
}
export type FetchingFormValues = Omit<SavingFormValues, "grades">;

export interface GPAFormValues {
  cns: string;
  specialSenses: string;
  communicationSkills: string;
}

export interface Student {
  id: number;
  grades: number;
  rank: number;
  total: number;
  empStudents: number;
  mainstreamStudents: number;
  rankAmongGroup: number;
}
export type FacultyFamilies = "Fekra" | "Atbaa";
export interface FacultyFamily {
  _id: string;
  name: string;
}
export interface FamilyEvent {
  start: Date;
  end: Date;
  _id: string;
  title: string;
  description: string;
  duration: number;
  family: FacultyFamily;
}
