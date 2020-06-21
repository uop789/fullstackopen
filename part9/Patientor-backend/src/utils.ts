/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import {
  Gender,
  NewPatient,
  NewBaseEntry,
  Diagnosis,
  EntryType,
  Discharge,
  HealthCheckRating,
  SickLeave,
  Entry,
  OccupationalHealthcareEntry,
} from './types';

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (field: string, value: any): string => {
  if (!value || !isString(value)) {
    throw new Error(`Value for field ${field} must be a string`);
  }

  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

// 6 digits, one dash, 3 or 4 alphanumeric characters
const isSSN = (ssn: string): boolean => {
  const re = /^\d{6}-\w{3,4}$/;
  return re.exec(ssn) !== null;
};
const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation),
    entries: [],
  };
};

const isArrayOfStrings = (param: any[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
};

const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    !isArrayOfStrings(diagnosisCodes)
  ) {
    throw new Error('Incorrect or missing list of diagnosis codes');
  }

  return diagnosisCodes;
};

const parseEntryType = (entryType: any): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error('Incorrect or missing entry type');
  }

  return entryType as EntryType;
};

const parseDischarge = (object: any): Discharge => {
  if (!object) throw new Error('Missing discharge');

  return {
    date: parseDate(object.date),
    criteria: parseString('criteria', object.criteria),
  };
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const parseSickLeave = (object: any): SickLeave => {
  if (!object) throw new Error('Missing sick leave');

  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const toNewEntry = (object: any): Entry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString('description', object.description),
    date: parseDate(object.date),
    specialist: parseString('specialist', object.specialist),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  const id = uuidv4();
  const type = parseEntryType(object.type);

  switch (type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(object.discharge),
        id,
        type,
      };
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        id,
        type,
      };

    case EntryType.OccupationalHealthCare:
      const newEntry: OccupationalHealthcareEntry = {
        ...newBaseEntry,
        employerName: parseString('employerName', object.employerName),
        id,
        type,
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    default:
      return assertNever(type);
  }
};
export { toNewPatient, toNewEntry };
