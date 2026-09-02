interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const periodLength = dailyHours.length;

  const trainingDays = dailyHours.filter(hour => hour > 0).length;

  const totalHours = dailyHours.reduce(
    (sum, hour) => sum + hour,
    0
  );

  const average = totalHours / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent, target achieved';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to work harder';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};