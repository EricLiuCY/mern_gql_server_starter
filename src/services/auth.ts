import jwt, { JwtPayload } from 'jsonwebtoken';

export type Tokens = {
    token: string,
    refreshToken: string,
}

export interface IJWT extends JwtPayload {
    userId: string,
}

export class Auth {

    public static encodeJWT(
        userId: string,
    ) : Tokens {

        const token = jwt.sign(
            {
                userId: userId,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: 1000 * 60 * 30, // 30 mins
            },
        );

        const refreshToken = jwt.sign(
            {
                userId: userId,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: 1000 * 60 * 60 * 24 * 30, // 30 days
            },
        );

        return {
            token,
            refreshToken,
        };

    }

    public static verifyJWT(
        token: string | undefined,
    ) : IJWT | undefined {

        if (!token) return undefined;

        const res = jwt.verify(token, process.env.JWT_SECRET!) as IJWT;

        return res;

    }

}
