import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry } from '../types';

const getPublicPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...patient,
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find((p) => p.id === id);
  return patient;
};

export default {
  getPublicPatients,
  addPatient,
  findById,
};
