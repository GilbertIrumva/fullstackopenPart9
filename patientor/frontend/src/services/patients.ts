import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient, PatientFormValues } from "../types";

const getAll = async (): Promise<Patient[]> => {
const { data } = await axios.get<Patient[]>(
`${apiBaseUrl}/patients`
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

export default {
getAll,
create
};
