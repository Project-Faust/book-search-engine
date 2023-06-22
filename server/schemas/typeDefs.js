const { gql } = require('apollo-server-express');
const { getSingleUser } = require('../controllers/user-controller');

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
        user(userID: ID!): User
        me: User
    }
    type Mutation {
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`
module.exports = typeDefs;