const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
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
    }
}