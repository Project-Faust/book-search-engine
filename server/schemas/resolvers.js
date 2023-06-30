const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (_, { userID }) => {
            const foundUser = await User.findOne({
                _id: userID,
              }).populate('savedBooks');
            if (!foundUser) {
                throw new Error('Cannot find a user with this ID or username!');
            }
            return foundUser;
        },
        me: async (_, __, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        }
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
        saveBook: async (_, { book }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
        deleteBook: async (_, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $pull: {
                        savedBooks: {
                            bookId
                        },
                    }
                },
                { new: true }
            );
            return updatedUser;
        },

    },
};

module.exports = resolvers;