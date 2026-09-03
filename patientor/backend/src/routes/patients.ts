import express from "express";

import patientService from "../services/patientService.js";
import { NewPatient } from "../types.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  const newPatient = req.body as NewPatient;

  const addedPatient = patientService.addPatient(newPatient);

  res.json(addedPatient);
});

export default router;