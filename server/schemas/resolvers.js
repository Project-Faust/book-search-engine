const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (_, { userID }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: userID }, { username: userID }],
            });

            if (!foundUser) {
                throw new Error('Cannot find a user with this ID or username!');
            }

            return foundUser;
        },
        me: async (_, __, { currentUser }) => {
            if (!currentUser) {
                throw new Error('You are not logged in.');
            }

            return currentUser;
        },
    },
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Username or password is incorrect');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Username or password is incorrect');
            }
            const token = signToken(user);
            return { token, user };
        }
    }
}