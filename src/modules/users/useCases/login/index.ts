import { envs } from "@/shared/envs";
import { JwtAdapter } from "@/shared/infra/adapters/authentication/implementations/JwtAdapter";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";

import { UserPrismaFactory } from "../../factories/implementations/UserPrismaFactory";
import { UsersPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { UserLoginController } from "./UserLoginController";
import { UserLoginUseCase } from "./UserLoginUseCase";


const encrypter = new BcryptAdapter(Number(envs.salt));
const authentication = new JwtAdapter();
const userFactory = new UserPrismaFactory();
const usersRepository = new UsersPrismaRepository(userFactory);

const userLoginUseCase = new UserLoginUseCase(
    usersRepository,
    authentication,
    encrypter,
);

const userLoginController = new UserLoginController(userLoginUseCase);

export { userLoginController };
