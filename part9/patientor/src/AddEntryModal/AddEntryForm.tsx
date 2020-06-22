import React from 'react';

import { NewEntryType } from '../types';
import { assertNever } from '../utils';
import { Segment } from 'semantic-ui-react';

import AddHealthCheckForm from './AddHealthCheckForm';
import AddHosptialForm from './AddHosptialForm';
import AddOccupationalHealthcareForm from './AddOccupationalHealthcareForm';

interface Props {
  onSubmit: (values: NewEntryType) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = React.useState<NewEntryType['type']>(
    'HealthCheck'
  );

  const selectForm = () => {
    switch (entryType) {
      case 'HealthCheck':
        return <AddHealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'Hospital':
        return <AddHosptialForm onSubmit={onSubmit} onCancel={onCancel} />;
      case 'OccupationalHealthcare':
        return (
          <AddOccupationalHealthcareForm
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        );
      default:
        return assertNever(entryType);
    }
  };

  return (
    <div>
      <select
        value={entryType}
        onChange={({ target }) =>
          setEntryType(target.value as NewEntryType['type'])
        }
      >
        <option value="HealthCheck">HealthCheck</option>
        <option value="Hospital">Hospital</option>
        <option value="OccupationalHealthcare">Occupational Healthcare</option>
      </select>
      <Segment>{selectForm()}</Segment>
    </div>
  );
};

export default AddEntryForm;
