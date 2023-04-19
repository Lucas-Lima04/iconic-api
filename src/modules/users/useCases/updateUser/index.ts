import { envs } from "@/shared/envs";
import { BcryptAdapter } from "@/shared/infra/adapters/cryptography/implementations/BcryptAdapter";

import { UserPrismaFactory } from "../../factories/implementations/UserPrismaFactory";
import { UsersPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";


const userFactory = new UserPrismaFactory();
const usersRepository = new UsersPrismaRepository(userFactory);

const encrypter = new BcryptAdapter(Number(envs.salt));

const updateUserUseCase = new UpdateUserUseCase(usersRepository, encrypter);
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };
