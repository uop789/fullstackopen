import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon, Divider } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';
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
          dispatch(updatePatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [patient, dispatch]);

  if (!patient) {
    return <div>No patient found</div>;
  }

  const { gender, dateOfBirth, occupation, name, ssn, entries } = patient;
  console.log(patient);

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
        <Divider hidden />
        <div>
          <h3>entries</h3>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id}>
                <p>
                  {entry.date} {entry.description}
                </p>
                {entry.diagnosisCodes && (
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div>No entries yet</div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PatientDeatilPage;
