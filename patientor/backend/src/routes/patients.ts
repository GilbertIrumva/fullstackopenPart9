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

router.post("/", (req, res) => {
  const result = newPatientSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).send("Invalid patient data");
    return;
  }

  const addedPatient = patientService.addPatient(result.data);

  res.json(addedPatient);
});

export default router;