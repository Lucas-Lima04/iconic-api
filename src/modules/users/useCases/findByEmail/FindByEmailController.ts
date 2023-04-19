import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IController } from "@/shared/protocols";

import { FindByEmailUseCase } from "./FindByEmailUseCase";

class FindByEmailController implements IController {
    constructor(
        private findByEmailUseCase: FindByEmailUseCase,
    ) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {            
            const { email } = request.body;

            const user = await this.findByEmailUseCase.execute({ email });

            return response.status(HttpStatusCode.OK).json(user);
        } catch (err) {
            return next(err);
        }
    }
}

export { FindByEmailController };
