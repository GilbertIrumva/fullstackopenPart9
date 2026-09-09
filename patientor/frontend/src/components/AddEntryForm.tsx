import {
  useState,
  SyntheticEvent
} from "react";

import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";

import {
  HealthCheckEntry,
  HealthCheckRating
} from "../types";

interface Props {
  onSubmit: (
    entry: Omit<HealthCheckEntry, "id">
  ) => void;
  onCancel: () => void;
  error?: string;
}

const AddEntryForm = ({
  onSubmit,
  onCancel,
  error
}: Props) => {
  const [description, setDescription] =
    useState("");

  const [date, setDate] =
    useState("");

  const [specialist, setSpecialist] =
    useState("");

  const [healthCheckRating, setHealthCheckRating] =
    useState("");

  const [diagnosisCodes, setDiagnosisCodes] =
    useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const rating = Number(healthCheckRating);

    const entry: Omit<HealthCheckEntry, "id"> = {
      description,
      date,
      specialist,
      type: "HealthCheck",
      healthCheckRating:
        rating as HealthCheckRating
    };

    if (diagnosisCodes.trim() !== "") {
      entry.diagnosisCodes = diagnosisCodes
        .split(",")
        .map((code) => code.trim())
        .filter((code) => code.length > 0);
    }

    onSubmit(entry);
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 1,
        padding: 2,
        marginBottom: 3
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 2 }}
      >
        Add HealthCheck Entry
      </Typography>

      {error && (
        <Typography
          color="error"
          sx={{ marginBottom: 2 }}
        >
          {error}
        </Typography>
      )}

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          required
          value={description}
          onChange={({ target }) =>
            setDescription(target.value)
          }
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          required
          value={date}
          onChange={({ target }) =>
            setDate(target.value)
          }
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) =>
            setSpecialist(target.value)
          }
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Health Check Rating"
          placeholder="0, 1, 2 or 3"
          fullWidth
          required
          value={healthCheckRating}
          onChange={({ target }) =>
            setHealthCheckRating(target.value)
          }
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Diagnosis codes"
          placeholder="S62.5, M51.2"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(target.value)
          }
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ marginRight: 1 }}
        >
          Add
        </Button>

        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddEntryForm;