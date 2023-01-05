import bcrypt from 'bcrypt';
import { IUserModel, User } from '.';
import { CreateUserInput, LoginInput } from '../../gql';
import { Auth, Tokens } from '../../services/auth';
import { IUserSchema } from './type';

export class UserService {

    public static async createUser(
        this: IUserModel,
        createUserInput: CreateUserInput,
    ): Promise<Tokens> {

        const hashPassWord = await bcrypt.hash(createUserInput.password, 10);

        const user = new User({
            fName: createUserInput.fName,
            lName: createUserInput.lName,
            email: createUserInput.email,
            phone: createUserInput.phone,
            password: hashPassWord,
        });

        await user.save();

        const tokens = Auth.encodeJWT(user._id.toHexString());

        return tokens;

    }

    public static async login(
        this: IUserModel,
        loginInput: LoginInput,
    ): Promise<Tokens> {

        const user = await this.findOne({
            $or: [
                { email: loginInput.username },
                { phone: loginInput.username },
            ],
        });

        if (!user) throw new Error('Not Found');

        // Compare the password
        const success = await bcrypt.compare(loginInput.password, user.password);

        if (!success) throw new Error('Bad Password');

        const tokens = Auth.encodeJWT(user._id.toHexString());

        return tokens;

    }

}
