import { envs } from "@/shared/envs";
import { JwtAdapter } from "@/shared/infra/adapters/authentication/implementations/JwtAdapter";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";

import { UserPrismaFactory } from "../../factories/implementations/UserPrismaFactory";
import { UsersPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { UserLoginUseCase } from "../login/UserLoginUseCase";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userFactory = new UserPrismaFactory();
const usersRepository = new UsersPrismaRepository(userFactory);

const encrypter = new BcryptAdapter(Number(envs.salt));

const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    encrypter
);

const authentication = new JwtAdapter();

const userLoginUseCase = new UserLoginUseCase(
    usersRepository,
    authentication,
    encrypter,
);

const createUserController = new CreateUserController(
    createUserUseCase,
    userLoginUseCase
);

export { createUserController };
