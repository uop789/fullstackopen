import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    bookCount
    born
    id
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      ...AuthorDetails
    }
    genres
    published
    id
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query allBooks($name: String, $genre: String) {
    allBooks(author: $name, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      user {
        username
        favoriteGenre
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
