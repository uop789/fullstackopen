import React from 'react';
import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';

const Recommend = ({ show }) => {
  const booksResult = useQuery(ALL_BOOKS);
  const userResult = useQuery(ME);

  if (!show || !booksResult.data || !userResult.data) {
    return null;
  }

  const genre = userResult.data.me.favoriteGenre;
  const recommendBooks = booksResult.data.allBooks.filter((b) =>
    b.genres.includes(genre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
