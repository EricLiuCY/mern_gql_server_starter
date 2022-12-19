import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import Express from 'express';
import http from 'http';
import { TestDefs } from './gql/typeDefs';

// import passportConfig
dotenv.config();

class Server {

    public app: Express.Application;
    public DATABASE_URL: string;
    public DATABASE_PORT: string;

    constructor() {

        // TODO JANKY FIX, return it from helper function
        this.DATABASE_PORT = '3333';
        this.DATABASE_URL = 'localhost';
        // Init Params
        this.app = Express();
        // const PORT = process.env.PORT || process.env.LOCALPORT;

        this.configureEnv();
        // this.configurePassport();
        this.middlewares();
        this.connectDB();

    }

    public async startServer() {

        const gqlPort = 8000;

        const httpServer = http.createServer(this.app);

        const apolloServer = new ApolloServer({
            typeDefs: TestDefs,
        })

        await apolloServer.start();

        this.app.use(
            expressMiddleware(apolloServer)
        )

        await new Promise((resolve) => this.app.listen(gqlPort, () => resolve(null)))

        // Set up apollo server
        // const apolloServer = new ApolloServer(

        // )
    }

    private middlewares() {

        // this.app.use(cors({
        //     origin: '*',
        // }));
        this.app.use(Express.json());
        // this.app.use(passport.initialize());
        // this.app.use(passport.session());

    }

    private configureEnv() {

        console.log(`Environment Configured to ${process.env.NODE_ENV}`);

        switch (process.env.NODE_ENV) {

            case 'PROD': {

                this.DATABASE_URL = process.env.PROD_DATABASE_URL!;
                this.DATABASE_PORT = process.env.PROD_DATABASE_PORT!;
                break;

            }
            case 'QA': {

                this.DATABASE_URL = process.env.QA_DATABASE_URL!;
                this.DATABASE_PORT = process.env.QA_DATABASE_PORT!;
                break;

            }
            case 'DEV': {

                this.DATABASE_URL = process.env.DEV_DATABASE_URL!;
                this.DATABASE_PORT = process.env.DEV_DATABASE_PORT!;
                break;

            }
            case 'LOCAL': {

                this.DATABASE_URL = process.env.LOCAL_DATABASE_URL!;
                this.DATABASE_PORT = process.env.LOCAL_DATABASE_PORT!;
                break;

            }
            case 'UNIT_TESTING': {

                this.DATABASE_URL = process.env.UNIT_TESTING_DATABASE_URL!;
                this.DATABASE_PORT = process.env.UNIT_TESTING_DATABASE_PORT!;
                break;

            }
            default: {

                this.DATABASE_URL = process.env.DEV_DATABASE_URL!;
                this.DATABASE_PORT = process.env.DEV_DATABASE_PORT!;
                break;

            }

        }

    }

    private async connectDB() {

        // try {

        //     mongoose.connect(this.DATABASE_URL, {
        //         useUnifiedTopology: true,
        //     });
        //     this.app.listen(this.DATABASE_PORT);
        //     console.info(`Mongoose Server running on port: ${this.DATABASE_PORT}`);
        //     mongoose.set('useFindAndModify', false);
        //     mongoose.set('returnOriginal', false);

        // } catch (error) {

        //     Log.error(error);

        // }

    }

}

export const App = new Server();
App.startServer();
