import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Icon, Divider, Button } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';
import { assertNever } from '../utils';
import EntryDetails from '../components/Entry';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientDeatilPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/api/patients/${id}/entries`,
        values
      );
      console.log(updatedPatient);
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          <h3>entries</h3>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
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
