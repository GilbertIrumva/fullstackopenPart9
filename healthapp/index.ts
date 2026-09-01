import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();

const PORT = 3000;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (
    typeof height !== 'string' ||
    typeof weight !== 'string'
  ) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (
    !Number.isFinite(heightNumber) ||
    !Number.isFinite(weightNumber)
  ) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(heightNumber, weightNumber);

  return res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});