import { UserPrismaFactory } from "../../factories/implementations/UserPrismaFactory";
import { UsersPrismaRepository } from "../../repositories/implementations/UserPrismaRepository";
import { FindByEmailController } from "./FindByEmailController";
import { FindByEmailUseCase } from "./FindByEmailUseCase";

const userFactory = new UserPrismaFactory();
const usersRepository = new UsersPrismaRepository(userFactory);


const findByEmailUseCase = new FindByEmailUseCase(usersRepository);

const findByEmailController = new FindByEmailController(
    findByEmailUseCase,
);

export { findByEmailController };
