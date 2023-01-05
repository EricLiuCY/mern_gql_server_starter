export const formatError = (formattedError: any, error: any) => {

    // Return a different error message
    if (
        formattedError.extensions.code === 1123
    ) {

        return {
            ...formattedError,
            message: "Your query doesn't match the schema. Try double-checking it!",
        };

    }

    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;

};
