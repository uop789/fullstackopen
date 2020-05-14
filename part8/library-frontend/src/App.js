import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';
import { useSubscription, useApolloClient } from '@apollo/client';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const client = useApolloClient();

  useEffect(() => {
    const savedToken = window.localStorage.getItem('booklibrary-user-token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    setPage('login');
    localStorage.clear();
    client.resetStore();
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      alert('new book ' + book.title + ' by ' + book.author.name);
      updateCacheWith(book);
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
