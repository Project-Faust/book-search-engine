import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation createUser($userusername: String!, $email: String!, $password: String!) {
        createUser(userusername: $username, email: $email, password: $password) {
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
    mutation saveBook ($book: String!) {
        saveBook (book: $book){
            _id
            authors
            descrption
            bookId
            image
            link
            title
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook ($bookId: String!) {
        deleteBook (bookId: $bookId) {
            token
            user {
                _id
                username
            }
        }
    }
`;