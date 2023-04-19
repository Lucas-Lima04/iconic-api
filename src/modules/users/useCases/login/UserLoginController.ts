import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "../../../../shared/protocols/IController";
import { UserLoginUseCase } from "./UserLoginUseCase";

class UserLoginController implements IController {
    constructor(private userLoginUseCase: UserLoginUseCase) { }

    private async validateBody(request: Request): Promise<void> {
        const schema = Yup.object({
            email: Yup.string().trim().email().required(),
            password: Yup.string().trim().required(),
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

            const { email, password } = request.body;
            const { token, user } = await this.userLoginUseCase.execute({
                email,
                password,
            });

            return response
                .status(HttpStatusCode.OK)
                .json({ token, user });
        } catch (err) {
            return next(err);
        }
    }
}

export { UserLoginController };
