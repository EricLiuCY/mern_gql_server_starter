import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import dotenv from 'dotenv';
import Express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { formatError } from './errors/formatError';
import { RootResolvers } from './gql/resolvers';
import { TestDefs } from './gql/typeDefs';
import { Auth } from './services/auth';
import { Logger } from './utils/logger';

export interface AppContext {
    userId?: string;
}

dotenv.config();

const connectDB = async () => {

    const DBUrl = process.env.mongo_url!;

    try {

        mongoose.connect(DBUrl);
        Logger.info('\n\nEVENT: Mongoose Server running');
        mongoose.set('returnOriginal', false);

    } catch (error) {

        Logger.info(error);

    }

};

const startServer = async () => {

    // Set environment varialbles
    const APP_PORT = 8000;

    // Initialize express application
    const app = Express();
    await connectDB();

    // Initialize Express Global middlewares
    app.use(Express.json());

    // Initialize the http server
    const httpServer = http.createServer(app);

    // Initialize apollo server
    const schema = makeExecutableSchema({
        typeDefs: TestDefs,
        resolvers: RootResolvers,
    });

    const apolloServer = new ApolloServer<AppContext>({
        typeDefs: schema,
        resolvers: RootResolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        formatError: formatError,
    });

    await apolloServer.start();

    // Apply Express Middleware and parse context
    app.use(
        expressMiddleware<AppContext>(apolloServer, {
            context: async ({ req, res }) : Promise<AppContext> => ({
                userId: Auth.verifyJWT(req.headers.authorization)?.userId,
            }),
        }),
    );

    app.listen(APP_PORT, () => {

        Logger.info('EVENT: Your server is now available\n\n');

    });

};

startServer();
