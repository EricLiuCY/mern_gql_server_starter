import { Resolvers } from '..';

export const UserResolvers : Resolvers = {

    Query: {
        stub: (param, _, test) => 'Working',
    },

    Mutation: {
        stub: (param, _, test) => 'Working',
    },

};
