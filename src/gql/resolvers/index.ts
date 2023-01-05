import merge from 'lodash.merge';
import { UserResolvers } from './user';

export const RootResolvers = merge(
    UserResolvers,
);
