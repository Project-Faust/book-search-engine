const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        # gets single user by id or username
        user(userID: ID!): User
        # gets current user via context
        me: User
    }
    type Mutation {
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`
module.exports = typeDefs;