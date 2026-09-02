import patients from "../data/patients.js";
import { NonSensitivePatient } from "../types.js";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...patient }) => patient);
};

export default {
  getNonSensitivePatients
};