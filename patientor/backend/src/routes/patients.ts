import express from "express";

import patientService from "../services/patientService.js";

const router = express.Router();

router.get("/", (_req, res) => {
res.json(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
if (!patientService.isNewPatient(req.body)) {
res.status(400).send("Invalid patient data");
return;
}

const addedPatient = patientService.addPatient(req.body);

res.json(addedPatient);
});

export default router;
