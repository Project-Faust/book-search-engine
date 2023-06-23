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
        getSingleUser(userID: ID!): User
    }
    type Mutation {
        createUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`
module.exports = typeDefs;