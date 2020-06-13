import React from 'react';
import { HospitalEntry as HospitalEntryType } from '../../types';
import { Icon, Card } from 'semantic-ui-react';
import DiagnosisCodeList from '../DiagnosisCodeList';

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size="large" name="hospital" />
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisCodeList diagnosesCodes={entry.diagnosisCodes} />
        )}
        <>
          <h4>Discharge</h4>
          <Card.Description>Date: {entry.discharge.date}</Card.Description>
          <Card.Description>{entry.discharge.criteria}</Card.Description>
        </>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
