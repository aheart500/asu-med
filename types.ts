export interface SavingFormValues {
  id: string;
  password: string;
  grades: number;
}
export type FetchingFormValues = Omit<SavingFormValues, "grades">;

export interface GPAFormValues {
  cns: string;
  specialSenses: string;
  communicationSkills: string;
}
