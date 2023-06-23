const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (_, { userID }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: userID }, { username: userID }],
            });
            if (!foundUser) {
                throw new Error('Cannot find a user with this ID or username!');
            }
            return foundUser;
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
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
        },
        // saveBook: async (_, { user, body }, context) => {
        //     if (context.user) {
        //         const book = await User.findOneAndUpdate(
        //             { _id: user.id },
        //             { $addToSet: { savedBooks: body } },
        //             { new: true, runValidators: true }
        //         );

        //     }
        // },
    },
};

module.exports = resolvers;