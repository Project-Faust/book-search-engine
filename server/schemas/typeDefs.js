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
    }
    type Mutation {
        createUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(book: String!, user: String!): User
        deleteBook(bookId: String!, user: String!): User
    }
`
module.exports = typeDefs;