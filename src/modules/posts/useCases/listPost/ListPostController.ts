import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/protocols";
import { ListPostUseCase } from "./ListPostUseCase";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";

class ListPostController implements IController {
    constructor(
        private ListPostUseCase: ListPostUseCase,
    ) { }


    async handle(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {

            const {
                l: limit,
                p: page,
            } = request.query;

            const posts = await this.ListPostUseCase.execute({
                limit: limit ? Number(limit) : undefined,
                page: page ? Number(page) : undefined,
            });

            return response.status(HttpStatusCode.CREATED).json(posts);
        } catch (err) {
            return next(err);
        }
    }
}

export { ListPostController };
