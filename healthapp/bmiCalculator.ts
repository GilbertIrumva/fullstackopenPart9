import { isNotNumber } from './utils.ts';

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'Underweight';
  }

  if (bmi < 25) {
    return 'Normal range';
  }

  if (bmi < 30) {
    return 'Overweight';
  }

  return 'Obese';
};

const parseArguments = (
  args: string[]
): { height: number; weight: number } => {
  if (args.length !== 4) {
    throw new Error('Wrong number of arguments');
  }

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values were not numbers');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';

    if (error instanceof Error) {
      errorMessage += ': ' + error.message;
    }

    console.log(errorMessage);
  }
}