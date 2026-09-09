import { Patient, Gender } from "../types.js";

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    dateOfBirth: "1990-01-01",
    ssn: "123456-7",
    gender: Gender.Male,
    occupation: "Developer",
    entries: []
  }
];

export default patients;
