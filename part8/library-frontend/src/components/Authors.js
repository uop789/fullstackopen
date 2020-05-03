import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries';
import Select from 'react-select';

const Authors = ({ show, token }) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [changeBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const submit = async (event) => {
    event.preventDefault();

    changeBirthYear({ variables: { name, born } });

    setName('');
    setBorn('');
  };

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const options = [];
  result.data.allAuthors.map((a) => {
    let obj = { value: a.name, label: a.name };
    return options.push(obj);
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ? (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <Select
                onChange={(value) => {
                  setName(value.value);
                }}
                options={options}
              />
            </div>
            <div>
              born{' '}
              <input
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Authors;
