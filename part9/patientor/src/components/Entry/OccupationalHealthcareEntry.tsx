import React from 'react';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../../types';
import { Card, Icon } from 'semantic-ui-react';
import DiagnosisCodeList from '../DiagnosisCodeList';

const OccupationalHealthcareEntry: React.FC<{
  entry: OccupationalHealthcareEntryType;
}> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size="large" name="stethoscope" />{' '}
          {entry.employerName}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisCodeList diagnosesCodes={entry.diagnosisCodes} />
        )}
        {entry.sickLeave && (
          <div>
            <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to{' '}
            {entry.sickLeave.endDate}
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntry;
