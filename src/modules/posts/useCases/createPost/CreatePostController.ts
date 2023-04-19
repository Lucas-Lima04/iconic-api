import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/protocols";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

class CreatePostController implements IController {
    constructor(
        private createPostUseCase: CreatePostUseCase,
    ) { }


    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {

            const photo: Express.Multer.File & { key?: string } | undefined = request.file;


            if(!photo || !photo.key) throw new ErrorHandler('error', 503);

            const post = await this.createPostUseCase.execute({
                path: photo.key,
                userGuid: request.user?.guid
            });

            return response.status(HttpStatusCode.CREATED).json(post);
        } catch (err) {
            return next(err);
        }
    }
}

export { CreatePostController };
