import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Typography
} from "@mui/material";

import {
  Link,
  useParams
} from "react-router-dom";

import axios from "axios";

import patientService from "../../services/patients";

import {
  Diagnosis,
  Patient,
  NewEntry
} from "../../types";

import EntryDetails from "./EntryDetails";
import AddEntryForm from "../AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({
  diagnoses
}: Props) => {
  const { id } =
    useParams<{ id: string }>();

  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [error, setError] =
    useState<string>();

  const [entryFormOpen, setEntryFormOpen] =
    useState<boolean>(false);

  const [entryError, setEntryError] =
    useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError("Patient ID is missing");
        return;
      }

      try {
        const fetchedPatient =
          await patientService.getOne(id);

        setPatient(fetchedPatient);
      } catch (e: unknown) {
        console.error(
          "Error fetching patient:",
          e
        );

        setError(
          "Failed to fetch patient"
        );
      }
    };

    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (
    entry: NewEntry
  ) => {
    if (!id || !patient) {
      return;
    }

    try {
      setEntryError(undefined);

      const addedEntry =
        await patientService.createEntry(
          id,
          entry
        );

      setPatient({
        ...patient,
        entries: patient.entries.concat(
          addedEntry
        )
      });

      setEntryFormOpen(false);
    } catch (e: unknown) {
      console.error(
        "Error adding entry:",
        e
      );

      if (axios.isAxiosError(e)) {
        if (
          typeof e.response?.data ===
          "string"
        ) {
          setEntryError(
            e.response.data
          );
        } else {
          setEntryError(
            "Failed to add entry"
          );
        }
      } else {
        setEntryError(
          "Failed to add entry"
        );
      }
    }
  };

  if (error) {
    return (
      <Box>
        <Typography color="error">
          {error}
        </Typography>

        <Button
          component={Link}
          to="/"
        >
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
      <Typography
        variant="h4"
        sx={{ marginBottom: 2 }}
      >
        {patient.name}
      </Typography>

      <Typography>
        <strong>Gender:</strong>{" "}
        {patient.gender}
      </Typography>

      <Typography>
        <strong>
          Date of birth:
        </strong>{" "}
        {patient.dateOfBirth}
      </Typography>

      <Typography>
        <strong>Occupation:</strong>{" "}
        {patient.occupation}
      </Typography>

      <Typography>
        <strong>SSN:</strong>{" "}
        {patient.ssn}
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      {entryFormOpen ? (
        <AddEntryForm
          diagnoses={diagnoses}
          onSubmit={submitNewEntry}
          onCancel={() => {
            setEntryFormOpen(false);
            setEntryError(undefined);
          }}
          error={entryError}
        />
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            setEntryError(undefined);
            setEntryFormOpen(true);
          }}
          sx={{ marginBottom: 3 }}
        >
          Add Entry
        </Button>
      )}

      <Typography
        variant="h5"
        sx={{ marginBottom: 2 }}
      >
        Entries
      </Typography>

      {patient.entries.map((entry) => (
        <Box
          key={entry.id}
          sx={{
            marginBottom: 3,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 1
          }}
        >
          <Typography>
            <strong>Date:</strong>{" "}
            {entry.date}
          </Typography>

          <Typography>
            <strong>
              Description:
            </strong>{" "}
            {entry.description}
          </Typography>

          <Typography>
            <strong>
              Specialist:
            </strong>{" "}
            {entry.specialist}
          </Typography>

          <Typography>
            <strong>
              Diagnosis codes:
            </strong>
          </Typography>

          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map(
              (code) => {
                const diagnosis =
                  diagnoses.find(
                    (diagnosis) =>
                      diagnosis.code ===
                      code
                  );

                return (
                  <Typography
                    key={code}
                    sx={{
                      marginLeft: 2
                    }}
                  >
                    {code}
                    {diagnosis
                      ? ` — ${diagnosis.name}`
                      : ""}
                  </Typography>
                );
              }
            )}

          <Box
            sx={{ marginTop: 2 }}
          >
            <EntryDetails
              entry={entry}
            />
          </Box>
        </Box>
      ))}

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
