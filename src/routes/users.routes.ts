import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "@/middlewares/auth";

import {
    createUserController,
    updateUserController,
    findCurrentUserController,
    userLoginController,
    findByEmailController,
} from "../modules/users/useCases";
import multerConfig from "@/config/multer";

const userRoutes = Router();
userRoutes.post("/login", (request, response, next) => {
    return userLoginController.handle(request, response, next);
});


userRoutes.post("/", multer(multerConfig).single("file"), (request, response, next) => {
    return createUserController.handle(request, response, next);
});

/** User routes */
userRoutes.put("/", multer(multerConfig).single("file"), authMiddleware("user"), (request, response, next) => {
    return updateUserController.handle(request, response, next);
});

userRoutes.get("/current", authMiddleware("user", 'admin'), (request, response, next) => {
    return findCurrentUserController.handle(request, response, next);
});

userRoutes.post("/email", authMiddleware("user", 'admin'), (request, response, next) => {
    return findByEmailController.handle(request, response, next);
});

/*userRoutes.get("/", authMiddleware("superAdmin"), (request, response, next) => {
    return listUserController.handle(request, response, next);
});
*/
export { userRoutes };
