import { model, Model } from 'mongoose';
import { CreateUserInput, LoginInput } from '../../gql';
import { Tokens } from '../../services/auth';
import { UserSchema } from './model';
import { UserService } from './service';
import { IUserSchema } from './type';

// Define the model
export interface IUserModel extends Model<IUserSchema> {
    createUser(
        this: IUserModel,
        createUserInput: CreateUserInput
    ): Promise<Tokens>
    login(
        this: IUserModel,
        loginInput: LoginInput,
    ): Promise<Tokens>
}

// Load the class
UserSchema.loadClass(UserService);

export const User = model<IUserSchema, IUserModel>('User', UserSchema);
