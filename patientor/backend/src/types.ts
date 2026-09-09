export interface Entry {
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other"
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}