import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    if (patient) {
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } else {
      res.status(404).send({ error: 'Sorry, this patient does not exist' });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
