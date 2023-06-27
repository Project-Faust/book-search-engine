import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getSingleUser($username: String!) {
    getSingleUser(username: $username) {
        _id
        username
        email
        savedBooks {
            _id
            authors
            description
            bookId
            image
            link
            title
          }
        }
    }
`;