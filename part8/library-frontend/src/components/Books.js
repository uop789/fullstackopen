import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('all genres');
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  let arrOfGenres = [];
  result.data.allBooks.map(
    (book) => (arrOfGenres = arrOfGenres.concat(book.genres))
  );
  let distinctGenres = [...new Set(arrOfGenres)];

  const handleOnclick = (genre) => {
    setGenre(genre);
  };

  const filteredBooks =
    genre === 'all genres'
      ? result.data.allBooks
      : result.data.allBooks.filter((book) => book.genres.includes(genre));

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {distinctGenres.map((genre) => (
          <button key={genre} onClick={() => handleOnclick(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleOnclick('all genres')}>all genres</button>
      </>
    </div>
  );
};

export default Books;
