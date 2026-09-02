import express from 'express';

import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== 'string' || typeof weight !== 'string') {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (!Number.isFinite(heightNumber) || !Number.isFinite(weightNumber)) {
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

app.post('/exercises', (req, res) => {
  interface ExerciseRequest {
    daily_exercises: unknown;
    target: unknown;
  }

  const body = req.body as ExerciseRequest;

  const { daily_exercises, target } = body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (typeof target !== 'number') {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const exercises: number[] = daily_exercises.filter(
    (day): day is number => typeof day === 'number'
  );

  if (exercises.length !== daily_exercises.length) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(exercises, target);

  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});