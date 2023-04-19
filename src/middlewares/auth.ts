import { NextFunction, Request, Response } from "express";

import { UserPrismaFactory } from "@/modules/users/factories/implementations/UserPrismaFactory";
import { UsersPrismaRepository } from "@/modules/users/repositories/implementations/UserPrismaRepository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { JwtAdapter } from "@/shared/infra/adapters/authentication/implementations/JwtAdapter";


type IAuthTypes = "user" | "admin" | "superAdmin";

const getToken = (request: Request) => {
    const token = request.headers.authorization?.split(" ")[1];

    return token || "";
};

export const authMiddleware =
    (...authAgents: IAuthTypes[]) =>
        async (
            request: Request,
            _response: Response,
            next: NextFunction
        ): Promise<void> => {
            try {
                const userFactory = new UserPrismaFactory();
                const usersRepository = new UsersPrismaRepository(userFactory);

                const jwtAdapter = new JwtAdapter();

                const token = getToken(request);

                const { guid, role } = jwtAdapter.decodeToken(token);
                
                if (role === "user" && authAgents.includes("user")) {
                    const user = await usersRepository.findByGuid(guid);

                    request.user = user;
                    request.role = role;

                    return next();
                }
            } catch (error) {
                return next(error);
            }
        };
