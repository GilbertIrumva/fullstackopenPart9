import patients from "../data/patients.js";
import { v1 as uuid } from "uuid";

import {
Patient,
NonSensitivePatient,
NewPatient,
Gender
} from "../types.js";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
return patients.map(({ ssn, ...patient }) => patient);
};

const isGender = (param: string): param is Gender => {
return Object.values(Gender).includes(param as Gender);
};

const isNewPatient = (object: unknown): object is NewPatient => {
if (!object || typeof object !== "object") {
return false;
}

const candidate = object as Record<string, unknown>;

return (
typeof candidate.name === "string" &&
typeof candidate.dateOfBirth === "string" &&
typeof candidate.ssn === "string" &&
typeof candidate.occupation === "string" &&
typeof candidate.gender === "string" &&
isGender(candidate.gender)
);
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
addPatient,
isNewPatient
};
