import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || isNaN(weight) || !height || isNaN(height)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateBmi(weight, height);
  res.json({ weight: req.query.weight, height: req.query.height, bmi: result });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).send({
      error: "parameters 'daily_exercises' and 'target' are required",
    });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({
      error: "parameter 'daily_exercises' must be an array of numbers",
    });
  }

  daily_exercises.map((day: number) => {
    const n = Number(day);
    if (isNaN(n) || n < 0) {
      res.status(400).send({
        error:
          "parameter 'daily_exercises' must be an array of non-negative numbers",
      });
    }
    return n;
  });
  const targetInNumber = Number(target);

  if (isNaN(target)) {
    return res.status(400).send({
      error: "parameter 'target' must be a valid number",
    });
  }

  const result = calculateExercises(targetInNumber, daily_exercises);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
