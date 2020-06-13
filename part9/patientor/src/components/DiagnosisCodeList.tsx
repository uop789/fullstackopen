import React from 'react';
import { useStateValue } from '../state';
import { Diagnosis } from '../types';

interface DiagnosisCodeListProps {
  diagnosesCodes: Array<Diagnosis['code']>;
}
const DiagnosisCodeList: React.FC<DiagnosisCodeListProps> = ({
  diagnosesCodes,
}) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <>
      <h4>DiagnosesCodes</h4>
      <ul>
        {diagnosesCodes.map((code) => {
          const details = diagnosis.find(
            (diagnosis) => diagnosis.code === code
          );
          return (
            details && (
              <li key={code}>
                {code}: {details.name}
              </li>
            )
          );
        })}
      </ul>
    </>
  );
};

export default DiagnosisCodeList;
