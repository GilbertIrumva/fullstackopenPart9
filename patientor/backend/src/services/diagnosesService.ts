import diagnoses from "../data/diagnoses.js";
import { Diagnosis } from "../types.js";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};