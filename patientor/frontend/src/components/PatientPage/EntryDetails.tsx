import {
  Box,
  Typography
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from "../../types";

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
};

const HospitalEntryDetails = ({
  entry
}: {
  entry: HospitalEntry;
}) => {
  return (
    <Box>
      <Typography>
        <LocalHospitalIcon
          sx={{
            verticalAlign: "middle",
            marginRight: 1
          }}
        />
        Hospital
      </Typography>

      <Typography>
        <strong>Discharge date:</strong>{" "}
        {entry.discharge.date}
      </Typography>

      <Typography>
        <strong>Discharge criteria:</strong>{" "}
        {entry.discharge.criteria}
      </Typography>
    </Box>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Box>
      <Typography>
        <WorkIcon
          sx={{
            verticalAlign: "middle",
            marginRight: 1
          }}
        />
        Occupational Healthcare
      </Typography>

      <Typography>
        <strong>Employer:</strong>{" "}
        {entry.employerName}
      </Typography>

      {entry.sickLeave && (
        <>
          <Typography>
            <strong>Sick leave start:</strong>{" "}
            {entry.sickLeave.startDate}
          </Typography>

          <Typography>
            <strong>Sick leave end:</strong>{" "}
            {entry.sickLeave.endDate}
          </Typography>
        </>
      )}
    </Box>
  );
};

const HealthCheckEntryDetails = ({
  entry
}: {
  entry: HealthCheckEntry;
}) => {
  return (
    <Box>
      <Typography>
        <FavoriteIcon
          sx={{
            verticalAlign: "middle",
            marginRight: 1
          }}
        />
        Health Check
      </Typography>

      <Typography>
        <strong>Health check rating:</strong>{" "}
        {entry.healthCheckRating}
      </Typography>
    </Box>
  );
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <HospitalEntryDetails entry={entry} />
      );

    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
        />
      );

    case "HealthCheck":
      return (
        <HealthCheckEntryDetails
          entry={entry}
        />
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;