import { UserPrismaFactory } from "../../factories/implementations/UserPrismaFactory";
import { UsersPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { FindCurrentUserController } from "./FindCurrentUserController";
import { FindCurrentUserUseCase } from "./FindCurrentUserUseCase";

const userFactory = new UserPrismaFactory();
const usersRepository = new UsersPrismaRepository(userFactory);

const findCurrentUserUseCase = new FindCurrentUserUseCase(usersRepository);

const findCurrentUserController = new FindCurrentUserController(
    findCurrentUserUseCase,
);

export { findCurrentUserController };
