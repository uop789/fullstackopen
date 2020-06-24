import * as yup from 'yup';

const baseSchema = yup.object().shape({
  description: yup.string().required(),
  date: yup
    .string()
    .matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in the format YYYY-MM-DD')
    .required(),
  specialist: yup.string().required(),
  diagnosisCodes: yup.array().of(yup.string()),
});

export const healthCheckSchema = baseSchema.shape({
  healthCheckRating: yup
    .number()
    .integer()
    .min(0)
    .max(3)
    .required('Please enter a rating from 0 - 3'),
});

export const hospitalSchema = baseSchema.shape({
  discharge: yup
    .object()
    .shape({
      date: yup
        .string()
        .matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in the format YYYY-MM-DD')
        .required('discharge date is a required field'),
      criteria: yup.string().required('discharge criteria is a required field'),
    })
    .required(),
});

export const occupationalHealthcareSchema = baseSchema.shape({
  employerName: yup.string().required(),
  sickLeave: yup.object().shape({
    startDate: yup
      .string()
      .matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in the format YYYY-MM-DD'),
    endDate: yup
      .string()
      .matches(/\w{4}-\w{2}-\w{2}/, 'Enter date in the format YYYY-MM-DD'),
  }),
});
