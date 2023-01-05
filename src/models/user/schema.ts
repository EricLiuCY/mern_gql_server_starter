import { Schema } from 'mongoose';
import { IUserModel } from '.';
import { IUserSchema } from './type';

export const UserSchema = new Schema<IUserSchema, IUserModel>(
    {

        fName: {
            type: String,
            required: true,
        },

        lName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    },
);
