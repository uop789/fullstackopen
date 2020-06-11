import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry } from '../types';

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

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

export default {
  getPublicPatients,
  addPatient,
  findById,
};
