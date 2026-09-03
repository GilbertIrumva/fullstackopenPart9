import patients from "../data/patients.js";
import { v1 as uuid } from "uuid";

import {
  Patient,
  NonSensitivePatient,
  NewPatient
} from "../types.js";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...patient }) => patient);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient
};