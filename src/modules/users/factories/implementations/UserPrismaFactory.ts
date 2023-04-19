import {
    User as PUser,
} from "@prisma/client";
import { IUser } from "../../model/IUser";
import { IUserFactory } from "../IUserFactory";

export interface IPrismaUserFactory extends PUser {
    user?: PUser | null;
}

export class UserPrismaFactory implements IUserFactory<IPrismaUserFactory> {
    constructor(
    ) { }
    generateFactoryObject(user: IPrismaUserFactory): IUser {

        return {
            guid: user.guid,
            name: user.name,
            email: user.email,
            encryptedPassword: user.encryptedPassword
        }
    }
}
