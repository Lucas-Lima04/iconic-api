import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "@/middlewares/auth";

import {
    createPostController, listPostController,
} from "../modules/posts/useCases";
import multerConfig from "@/config/multer";

const postRoutes = Router();

postRoutes.post("/", authMiddleware('user'), multer(multerConfig).single("file"), (request, response, next) => {
    return createPostController.handle(request, response, next);
});

postRoutes.get("/", authMiddleware('user'), (request, response, next) => {
    return listPostController.handle(request, response, next);
});
export { postRoutes };
