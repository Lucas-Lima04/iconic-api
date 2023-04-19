import { IUser } from "../model/IUser";

interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}

interface IUpdateUserDTO {
    guid: string;
    name?: string;
    email?: string;
    encryptedPassword?: string;
}

export interface IListUsersRequest {
    search?: string;
    limit?: number;
    offset?: number;
    orderParams?: any;
}

export interface IListUsersResponse {
    users: IUser[];
    count: number;
}

interface IUserRepository {
    create(params: ICreateUserDTO): Promise<IUser>;
    update(params: IUpdateUserDTO): Promise<IUser>;
    findByGuid(guid: string): Promise<IUser | undefined>;
    findByEmail(email: string, hospitalGuid?: string): Promise<IUser | undefined>;
}

export {
    IUserRepository,
    ICreateUserDTO,
    IUpdateUserDTO,
};
