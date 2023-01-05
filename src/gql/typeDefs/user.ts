export const UserTypeDefs = `#graphql
    extend type Query {
        wait: String
        createUser(createUserInput: CreateUserInput!): Tokens!
        login(loginInput: LoginInput!): Tokens!
    }

    type User {
        _id: ID!
        fName: String!
        lName: String!
        email: String!
        phone: String!
        password: String!
    }

    type Tokens {
        token: String!
        refreshToken: String!
    }

    input CreateUserInput {
        fName: String!
        lName: String!
        email: String!
        phone: String!
        password: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

`;
