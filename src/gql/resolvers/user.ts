import { User } from '../../models/user';
import { Resolvers } from '..';

export const UserResolvers : Resolvers = {

    Query: {
        createUser: async (parent, { createUserInput }, context) => {

            const tokens = await User.createUser(createUserInput);
            return tokens;

        },

        login: async (parent, { loginInput }, context) => {

            const tokens = await User.login(loginInput);
            return tokens;

        },

    },
};
