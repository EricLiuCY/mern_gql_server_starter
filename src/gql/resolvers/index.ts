import { Resolvers } from "../types";

export const RootResolver : Resolvers = {

    Query: {
        wait: () => '123'
    }
}