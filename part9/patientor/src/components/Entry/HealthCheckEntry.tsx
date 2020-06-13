import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HealthCheckEntry as HealthCheckEntryType } from '../../types';
import HealthRatingBar from '../HealthRatingBar';
import DiagnosisCodeList from '../DiagnosisCodeList';

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({
  entry,
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size="large" name="user md" />
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisCodeList diagnosesCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      <Card.Content extra>
        <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;
