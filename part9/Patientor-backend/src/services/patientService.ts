import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, Entry } from '../types';

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addEntry = (patient: Patient, newEntry: Entry): Patient => {
  const updatedPatient = { ...patient, entries: patient.entries.concat(newEntry) };
  patients.map((patient) =>
    patient.id === updatedPatient.id ? updatedPatient : patient
  );

  return updatedPatient;
};

export default {
  getPublicPatients,
  addPatient,
  findById,
  addEntry,
};
