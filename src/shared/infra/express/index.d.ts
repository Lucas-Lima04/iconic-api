/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/naming-convention */
import { IAdmin } from "../../../modules/admin/model/IAdmin";
import { IUser } from "../../../modules/users/model/IUser";

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser | IAdmin;
        role?: "user" | "admin" | "superAdmin";
    }
}
