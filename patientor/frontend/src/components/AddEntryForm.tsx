import {
  useState,
  SyntheticEvent
} from "react";

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl
} from "@mui/material";

import {
  NewEntry,
  HealthCheckRating
} from "../types";

interface Props {
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
  error?: string;
}

type EntryType =
  | "HealthCheck"
  | "Hospital"
  | "OccupationalHealthcare";

const AddEntryForm = ({
  onSubmit,
  onCancel,
  error
}: Props) => {
  const [type, setType] =
    useState<EntryType>("HealthCheck");

  const [description, setDescription] =
    useState("");

  const [date, setDate] =
    useState("");

  const [specialist, setSpecialist] =
    useState("");

  const [diagnosisCodes, setDiagnosisCodes] =
    useState("");

  const [healthCheckRating, setHealthCheckRating] =
    useState("");

  const [dischargeDate, setDischargeDate] =
    useState("");

  const [dischargeCriteria, setDischargeCriteria] =
    useState("");

  const [employerName, setEmployerName] =
    useState("");

  const [sickLeaveStartDate, setSickLeaveStartDate] =
    useState("");

  const [sickLeaveEndDate, setSickLeaveEndDate] =
    useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      type,
      ...(diagnosisCodes.trim() !== ""
        ? {
            diagnosisCodes: diagnosisCodes
              .split(",")
              .map((code) => code.trim())
              .filter(
                (code) => code.length > 0
              )
          }
        : {})
    };

    if (type === "HealthCheck") {
      const rating =
        Number(healthCheckRating);

      onSubmit({
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating:
          rating as HealthCheckRating
      });

      return;
    }

    if (type === "Hospital") {
      onSubmit({
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      });

      return;
    }

    onSubmit({
      ...baseEntry,
      type: "OccupationalHealthcare",
      employerName,
      ...(sickLeaveStartDate.trim() !== "" &&
      sickLeaveEndDate.trim() !== ""
        ? {
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate
            }
          }
        : {})
    });
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
        Add Entry
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
        <FormControl
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <InputLabel id="entry-type-label">
            Entry type
          </InputLabel>

          <Select
            labelId="entry-type-label"
            value={type}
            label="Entry type"
            onChange={(event) =>
              setType(
                event.target.value as EntryType
              )
            }
          >
            <MenuItem value="HealthCheck">
              Health Check
            </MenuItem>

            <MenuItem value="Hospital">
              Hospital
            </MenuItem>

            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>

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

        {type === "HealthCheck" && (
          <TextField
            label="Health Check Rating"
            placeholder="0, 1, 2 or 3"
            fullWidth
            required
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(
                target.value
              )
            }
            sx={{ marginBottom: 2 }}
          />
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              required
              value={dischargeDate}
              onChange={({ target }) =>
                setDischargeDate(
                  target.value
                )
              }
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Discharge criteria"
              fullWidth
              required
              value={dischargeCriteria}
              onChange={({ target }) =>
                setDischargeCriteria(
                  target.value
                )
              }
              sx={{ marginBottom: 2 }}
            />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              required
              value={employerName}
              onChange={({ target }) =>
                setEmployerName(
                  target.value
                )
              }
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) =>
                setSickLeaveStartDate(
                  target.value
                )
              }
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) =>
                setSickLeaveEndDate(
                  target.value
                )
              }
              sx={{ marginBottom: 2 }}
            />
          </>
        )}

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