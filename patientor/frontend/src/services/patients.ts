import axios from "axios";

import { apiBaseUrl } from "../constants";
import {
  Patient,
  PatientFormValues,
  NonSensitivePatient,
  NewEntry,
  Entry
} from "../types";

const getAll = async (): Promise<NonSensitivePatient[]> => {
  const { data } = await axios.get<NonSensitivePatient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (
  values: PatientFormValues
): Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    values
  );

  return data;
};

const createEntry = async (
  patientId: string,
  entry: NewEntry
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );

  return data;
};

export default {
  getAll,
  getOne,
  create,
  createEntry
};