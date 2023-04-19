import { IAdmin } from "@/modules/admin/model/IAdmin";
import { IUser } from "@/modules/users/model/IUser";

export interface IAuthentication {
    generateToken(agent: IUser | IAdmin): string;
    decodeToken(token: string): { guid: string; role: string };
}
