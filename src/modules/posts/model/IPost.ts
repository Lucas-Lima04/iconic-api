import { IUser } from "@/modules/users/model/IUser";

export interface IPost {
    guid: string;
    userGuid: string;
    user?: IUser;
    path: string;
    createdAt: Date | null;
}
