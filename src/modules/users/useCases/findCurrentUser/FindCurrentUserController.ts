import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IController } from "@/shared/protocols";

import { FindCurrentUserUseCase } from "./FindCurrentUserUseCase";

class FindCurrentUserController implements IController {
    constructor(
        private findCurrentUserUseCase: FindCurrentUserUseCase,
    ) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const guid = request.user?.guid || "";
            const user = await this.findCurrentUserUseCase.execute({ guid });
            
            if (!user) {
                throw new ErrorHandler(
                    "Unauthorized. Authentication failed.",
                    HttpStatusCode.FORBIDDEN
                );
            }

            return response.status(HttpStatusCode.OK).json(user);
        } catch (err) {
            return next(err);
        }
    }
}

export { FindCurrentUserController };
