import {
  useState,
  SyntheticEvent
} from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";

import {
  NewEntry,
  HealthCheckRating,
  Diagnosis
} from "../types";

interface Props {
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
  error?: string;
  diagnoses: Diagnosis[];
}

type EntryType =
  | "HealthCheck"
  | "Hospital"
  | "OccupationalHealthcare";

const AddEntryForm = ({
  onSubmit,
  onCancel,
  error,
  diagnoses
}: Props) => {
  const [type, setType] =
    useState<EntryType>("HealthCheck");

  const [description, setDescription] =
    useState("");

  const [date, setDate] =
    useState("");

  const [specialist, setSpecialist] =
    useState("");

  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] =
    useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating | "">("");

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

  const handleDiagnosisChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    const value = event.target.value;

    setSelectedDiagnosisCodes(
      typeof value === "string"
        ? value.split(",")
        : value
    );
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      ...(selectedDiagnosisCodes.length > 0
        ? {
            diagnosisCodes:
              selectedDiagnosisCodes
          }
        : {})
    };

    if (type === "HealthCheck") {
      if (healthCheckRating === "") {
        return;
      }

      onSubmit({
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating
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
      ...(sickLeaveStartDate !== "" &&
      sickLeaveEndDate !== ""
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
          type="date"
          fullWidth
          required
          value={date}
          onChange={({ target }) =>
            setDate(target.value)
          }
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
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
          <FormControl
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          >
            <InputLabel id="health-rating-label">
              Health Check Rating
            </InputLabel>

            <Select
              labelId="health-rating-label"
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={(event) =>
                setHealthCheckRating(
                  event.target.value as HealthCheckRating
                )
              }
            >
              <MenuItem value={HealthCheckRating.Healthy}>
                Healthy (0)
              </MenuItem>

              <MenuItem value={HealthCheckRating.LowRisk}>
                Low Risk (1)
              </MenuItem>

              <MenuItem value={HealthCheckRating.HighRisk}>
                High Risk (2)
              </MenuItem>

              <MenuItem value={HealthCheckRating.CriticalRisk}>
                Critical Risk (3)
              </MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              required
              value={dischargeDate}
              onChange={({ target }) =>
                setDischargeDate(
                  target.value
                )
              }
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
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
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) =>
                setSickLeaveStartDate(
                  target.value
                )
              }
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Sick leave end date"
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) =>
                setSickLeaveEndDate(
                  target.value
                )
              }
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              sx={{ marginBottom: 2 }}
            />
          </>
        )}

        <FormControl
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <InputLabel id="diagnosis-codes-label">
            Diagnosis codes
          </InputLabel>

          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={selectedDiagnosisCodes}
            onChange={handleDiagnosisChange}
            label="Diagnosis codes"
            renderValue={(selected) =>
              selected.join(", ")
            }
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem
                key={diagnosis.code}
                value={diagnosis.code}
              >
                <Checkbox
                  checked={selectedDiagnosisCodes.includes(
                    diagnosis.code
                  )}
                />

                <ListItemText
                  primary={diagnosis.code}
                  secondary={diagnosis.name}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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