import express from "express";
import { z } from "zod";

import patientService from "../services/patientService.js";
import { HealthCheckRating } from "../types.js";

const router = express.Router();

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string()
});

const healthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk)
]);

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});

const occupationalHealthcareEntrySchema =
  baseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
      startDate: z.string(),
      endDate: z.string()
    }).optional()
  });

const healthCheckEntrySchema =
  baseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: healthCheckRatingSchema
  });

const newEntrySchema = z.discriminatedUnion(
  "type",
  [
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema,
    healthCheckEntrySchema
  ]
);

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(
    req.params.id
  );

  if (!patient) {
    res.status(404).send({
      error: "Patient not found"
    });
    return;
  }

  res.json(patient);
});

router.post("/", (req, res) => {
  const result = newPatientSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).send("Invalid patient data");
    return;
  }

  const addedPatient = patientService.addPatient({
    ...result.data,
    entries: []
  });

  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  const result = newEntrySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).send("Invalid entry data");
    return;
  }

  const addedEntry = patientService.addEntry(
    req.params.id,
    result.data
  );

  if (!addedEntry) {
    res.status(404).send({
      error: "Patient not found"
    });
    return;
  }

  res.status(201).json(addedEntry);
});

export default router;