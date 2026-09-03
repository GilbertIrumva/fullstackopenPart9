import { useState } from "react";

import {
Box,
Table,
Button,
TableHead,
Typography,
TableCell,
TableRow,
TableBody
} from "@mui/material";

import axios from "axios";

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";
import patientService from "../../services/patients";

interface Props {
patients: Patient[];
setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
const [modalOpen, setModalOpen] = useState<boolean>(false);
const [error, setError] = useState<string>();

const openModal = (): void => setModalOpen(true);

const closeModal = (): void => {
setModalOpen(false);
setError(undefined);
};

const submitNewPatient = async (values: PatientFormValues) => {
try {
const patient = await patientService.create(values);

  setPatients(patients.concat(patient));
  setModalOpen(false);
} catch (e: unknown) {
  console.error("Error adding patient:", e);

  if (axios.isAxiosError(e)) {
    console.error("Status:", e.response?.status);
    console.error("Response data:", e.response?.data);
    console.error("Request URL:", e.config?.url);

    if (typeof e.response?.data === "string") {
      setError(e.response.data);
    } else if (e.response?.data) {
      setError(JSON.stringify(e.response.data));
    } else {
      setError(e.message);
    }
  } else {
    console.error("Unknown error:", e);
    setError("Unknown error");
  }
}

};

return ( <div className="App"> <Box> <Typography align="center" variant="h6">
Patient list </Typography> </Box>

  <Table sx={{ marginBottom: "1em" }}>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Gender</TableCell>
        <TableCell>Occupation</TableCell>
        <TableCell>Health Rating</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {patients.map((patient: Patient) => (
        <TableRow key={patient.id}>
          <TableCell>{patient.name}</TableCell>
          <TableCell>{patient.gender}</TableCell>
          <TableCell>{patient.occupation}</TableCell>
          <TableCell>
            <HealthRatingBar showText={false} rating={1} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

  <AddPatientModal
    modalOpen={modalOpen}
    onSubmit={submitNewPatient}
    error={error}
    onClose={closeModal}
  />

  <Button variant="contained" onClick={openModal}>
    Add New Patient
  </Button>
</div>

);
};

export default PatientListPage;
