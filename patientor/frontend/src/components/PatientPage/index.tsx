import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Typography
} from "@mui/material";

import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError("Patient ID is missing");
        return;
      }

      try {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      } catch (e: unknown) {
        console.error("Error fetching patient:", e);
        setError("Failed to fetch patient");
      }
    };

    void fetchPatient();
  }, [id]);

  if (error) {
    return (
      <Box>
        <Typography color="error">
          {error}
        </Typography>

        <Button component={Link} to="/">
          Back to patient list
        </Button>
      </Box>
    );
  }

  if (!patient) {
    return (
      <Typography>
        Loading patient information...
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {patient.name}
      </Typography>

      <Typography variant="body1">
        <strong>Gender:</strong> {patient.gender}
      </Typography>

      <Typography variant="body1">
        <strong>Date of birth:</strong> {patient.dateOfBirth}
      </Typography>

      <Typography variant="body1">
        <strong>Occupation:</strong> {patient.occupation}
      </Typography>

      <Typography variant="body1">
        <strong>SSN:</strong> {patient.ssn}
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Entries
      </Typography>

      {patient.entries.length === 0 ? (
        <Typography>
          No entries yet.
        </Typography>
      ) : (
        patient.entries.map((_entry, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography>
              Journal entry
            </Typography>
          </Box>
        ))
      )}

      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Back to patient list
      </Button>
    </Box>
  );
};

export default PatientPage;
