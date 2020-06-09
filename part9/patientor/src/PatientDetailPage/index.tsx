import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { assertNever } from '../utils';

const PatientDeatilPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  React.useEffect(() => {
    if (patient && !patient.ssn) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/api/patients/${patient.id}`
          );
          dispatch({ type: 'UPDATE_PATIENT', payload: patientFromApi });
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [id, dispatch]);

  if (!patient) {
    return <div>No patient found</div>;
  }

  const { gender, dateOfBirth, occupation, name, ssn } = patient;

  const iconType = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return 'mars';
      case Gender.Female:
        return 'venus';
      case Gender.Other:
        return 'genderless';
      default:
        return assertNever(gender);
    }
  };

  return (
    <div className="App">
      <Container>
        <h2>
          {name} <Icon name={iconType(gender)} />
        </h2>
        <div>
          Date of birth: {dateOfBirth} <br />
          SSN: {ssn} <br />
          Occupation: {occupation} <br />
        </div>
      </Container>
    </div>
  );
};

export default PatientDeatilPage;
