import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;


export const ADD_BOOK = gql`
  mutation saveBook($book: saveBookInput!) {
    saveBook(book: $book) {
        savedBooks {
         authors
         bookId
         description
         image
         link
         title
          _id
    }
    }
  }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook ($bookId: ID!) {
        deleteBook (bookId: $bookId) {
            savedBooks {
            authors
            bookId
            description
            image
            link
            title
            _id

        }
    }
    }
`;