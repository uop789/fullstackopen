// interface parsedArgs {
//   value1: number;
//   value2: Array<number>;
// }

// const parseArgumentsForExercise = (args: Array<string>): parsedArgs => {
//   const arr = args.slice(2).filter((value) => typeof value !== 'number');
//   if (arr.length !== 0) {
//     const newArr = args.slice(3).map((value) => Number(value));
//     return {
//       value1: Number(args[2]),
//       value2: newArr,
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };

interface exerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  target: number,
  args: Array<number>
): exerciseData => {
  const periodLength = args.length;
  const trainingDays = args.filter((num) => num !== 0).length;
  const average =
    args.reduce((accumulator, currentValue) => accumulator + currentValue) /
    periodLength;
  let success = false;
  let rating;
  let ratingDescription;

  if (average >= target) {
    success = true;
    if (average - target <= 0.5) {
      rating = 2;
      ratingDescription = 'good job, you can do better';
    } else {
      rating = 3;
      ratingDescription = 'excellent, keep doing!';
    }
  } else {
    success = false;
    if (target - average <= 0.5) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    } else {
      rating = 1;
      ratingDescription = 'hurry up~ Do more exercise';
    }
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { value1, value2 } = parseArgumentsForExercise(process.argv);
//   console.log(calculateExercises(value1, value2));
// } catch (e) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//   console.log('Error, something bad happened, message: ', e.message);
// }
