import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import { IUser } from "@/modules/users/model/IUser";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { envs } from "@/shared/envs";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

import { IAuthentication } from "../IAuthentication";

interface IJwtPayload extends JwtPayload {
    guid: string;
    role: string;
}

export class JwtAdapter implements IAuthentication {
    generateToken(agent: IUser): string {
        let role = "user";

        const token = jwt.sign(
            {
                guid: agent.guid,
                role,
            },
            envs.jwtSalt,
            {
                expiresIn: "90 d",
            }
        );

        return token;
    }

    decodeToken(token: string): IJwtPayload {
        try {
            const { guid, role } = jwt.verify(
                token,
                envs.jwtSalt
            ) as IJwtPayload;

            return { guid, role };
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new ErrorHandler(
                    "Unauthorized. Authentication failed.",
                    HttpStatusCode.UNAUTHORIZED
                );
            }

            return { guid: "", role: "" };
        }
    }
}
