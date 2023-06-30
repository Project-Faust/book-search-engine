const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }
    type Book {
        _id: ID!
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        getSingleUser(userID: ID!): User
        me: User
    }
    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(book: saveBookInput!): User
        deleteBook(bookId: ID!): User
    }
    input saveBookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
      }
    type DeleteBookResponse {
        token: String!
        user: User!
        deletedBookId: ID!
    }
`;
module.exports = typeDefs;