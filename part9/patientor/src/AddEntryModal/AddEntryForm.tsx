import React from 'react';

import { NewEntryType } from '../types';
import { assertNever } from '../utils';
import { Segment, Grid, Button } from 'semantic-ui-react';

import { Field, Formik, Form } from 'formik';
import {
  TextField,
  NumberField,
  DiagnosisSelection,
} from '../components/FormField';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: NewEntryType) => void;
  onCancel: () => void;
}

const HosptitalForm = () => (
  <>
    <Field
      component={TextField}
      label="Discharge date"
      name="discharge.date"
      placeholder="YYYY-MM-DD"
    />
    <Field
      component={TextField}
      label="Discharge criteria"
      name="discharge.criteria"
      placeholder="Discharge criteria"
    />
  </>
);

const OccupationalHealthcareForm = () => (
  <>
    <Field
      component={TextField}
      label="Employer Name"
      name="employerName"
      placeholder="Employer name"
    />
    <Field
      label="Sick leave start date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.startDate"
      component={TextField}
    />
    <Field
      label="Sick leave end date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.endDate"
      component={TextField}
    />
  </>
);

const HealthCheckForm = () => (
  <>
    <Field
      label="healthCheckRating"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />
  </>
);

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  const [entryType, setEntryType] = React.useState<NewEntryType['type']>(
    'HealthCheck'
  );

  const baseInitialValues = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [''],
  };

  const healthCheckInitialValues: NewEntryType = {
    ...baseInitialValues,
    type: 'HealthCheck',
    healthCheckRating: 0,
  };

  const occupationalHealthCareIntitialValues: NewEntryType = {
    ...baseInitialValues,
    type: 'OccupationalHealthcare',
    employerName: '',
    sickLeave: { startDate: '', endDate: '' },
  };

  const hospitalIntitialValues: NewEntryType = {
    ...baseInitialValues,
    type: 'Hospital',
    discharge: { date: '', criteria: '' },
  };

  const initialValues = () => {
    switch (entryType) {
      case 'HealthCheck':
        return healthCheckInitialValues;
      case 'Hospital':
        return hospitalIntitialValues;
      case 'OccupationalHealthcare':
        return occupationalHealthCareIntitialValues;
      default:
        return assertNever(entryType);
    }
  };

  const selectForm = () => {
    switch (entryType) {
      case 'HealthCheck':
        return <HealthCheckForm />;
      case 'Hospital':
        return <HosptitalForm />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareForm />;
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
      <Segment>
        <Formik
          initialValues={initialValues()}
          onSubmit={onSubmit}
          validate={(values) => {
            const requiredError = 'Field is required';
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnosis)}
                />
                {selectForm()}
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Segment>
    </div>
  );
};

export default AddEntryForm;
