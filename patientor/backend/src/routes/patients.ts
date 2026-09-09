import express from "express";
import { z } from "zod";
import patientService from "../services/patientService.js";

const router = express.Router();

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string()
});

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (!patient) {
    res.status(404).send({ error: "Patient not found" });
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

export default router;