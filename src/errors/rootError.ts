import { GraphQLError } from 'graphql';

export class RootError extends GraphQLError {

    constructor(
        message: string,
        code: string,
    ) {

        super(
            message,
            {
                extensions: {
                    code: code,
                },
            },
        );

    }

}
