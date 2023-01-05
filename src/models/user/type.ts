import { Types } from 'mongoose';

export interface IUserSchema {

    _id: Types.ObjectId,
    fName: string,
    lName: string,
    email: string,
    phone: string,
    password: string,

}
