import { IUser } from "../model/IUser";

export interface IUserFactory<ORM_ENTITY> {
    generateFactoryObject(user: ORM_ENTITY): IUser;
}
