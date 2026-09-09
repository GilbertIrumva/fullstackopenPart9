import patients from "../data/patients.js";
import { v1 as uuid } from "uuid";

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  NewEntry
} from "../types.js";

const addEntry = (
  patientId: string,
  entry: NewEntry
): Entry | undefined => {
  const patient = patients.find(
    p => p.id === patientId
  );

  if (!patient) {
    return undefined;
  }

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);

  return newEntry;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

const getPatientById = (
  id: string
): Patient | undefined => {
  return patients.find(
    patient => patient.id === id
  );
};

const addPatient = (
  entry: NewPatient
): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntry
};