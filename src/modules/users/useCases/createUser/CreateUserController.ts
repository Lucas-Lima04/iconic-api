import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/protocols";
import { UserLoginUseCase } from "../login/UserLoginUseCase";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

class CreateUserController implements IController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private userLoginUseCase: UserLoginUseCase
    ) { }

    private async validateBody(request: Request): Promise<void> {
        const schema = Yup.object({
            name: Yup.string().trim().required().max(191),
            email: Yup.string().trim().required().email(),
            password: Yup.string()
                .trim()
                .required(),
        });

        await schema.validate(request.body);
    }

    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            await this.validateBody(request);

            const { name, email, password } =
                request.body;

            const user = await this.createUserUseCase.execute({
                name,
                email,
                password,
            });

            const { token } = await this.userLoginUseCase.execute({
                email: user.email,
                password,
            });

            return response.status(HttpStatusCode.CREATED).json({
                token,
                user,
            });
        } catch (err) {
            return next(err);
        }
    }
}

export { CreateUserController };
