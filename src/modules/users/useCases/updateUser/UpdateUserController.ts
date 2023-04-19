import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IController } from "@/shared/protocols";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController implements IController {
    constructor(private updateUserUseCase: UpdateUserUseCase) { }

    private async validateBody(request: Request): Promise<void> {
        const schema = Yup.object({
            name: Yup.string().trim().max(191).nullable(),
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

            const { user } = request;

            if (!user) {
                throw new ErrorHandler(
                    "Unauthorized. Authentication failed.",
                    HttpStatusCode.FORBIDDEN
                );
            }

            const {
                name,
                currentPassword,
                newPassword,
            } = request.body;

            const updatedUser = await this.updateUserUseCase.execute({
                guid: user.guid,
                name,
                currentPassword,
                newPassword,
            });

            return response
                .status(HttpStatusCode.OK)
                .json(updatedUser);
        } catch (err) {
            return next(err);
        }
    }
}
