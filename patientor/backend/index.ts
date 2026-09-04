import express from "express";

import patientsRouter from "./src/routes/patients.js";
import diagnosesRouter from "./src/routes/diagnoses.js";

const app = express();

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});