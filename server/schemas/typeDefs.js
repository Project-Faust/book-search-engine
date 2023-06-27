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
        saveBook(username: String!, book: String!): User
        deleteBook(username: String!, bookId: String!): User
    }
`;
module.exports = typeDefs;