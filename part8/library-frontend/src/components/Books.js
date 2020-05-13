import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const allbooksResult = useQuery(ALL_BOOKS);
  const [genreBooks, genreBooksResult] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (allbooksResult.data) {
      const books = allbooksResult.data.allBooks;
      setBooks(books);
      let arrOfGenres = [];
      books.map((book) => (arrOfGenres = arrOfGenres.concat(book.genres)));
      setGenres([...new Set(arrOfGenres)]);
    }
  }, [allbooksResult.data]);

  useEffect(() => {
    if (genreBooksResult.data) {
      setBooks(genreBooksResult.data.allBooks);
    }
  }, [genreBooksResult.data]);

  const handleOnClick = (newGenre) => {
    setGenre(newGenre);
    genreBooks({ variables: { genre: newGenre } });
  };

  if (!props.show) {
    return null;
  }
  if (allbooksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleOnClick(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleOnClick(null)}>all genres</button>
      </>
    </div>
  );
};

export default Books;
