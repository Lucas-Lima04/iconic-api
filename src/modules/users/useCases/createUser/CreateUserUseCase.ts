import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ICryptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { IUseCase } from "@/shared/protocols/IUseCase";

import { IUser } from "../../model/IUser";
import { IUserRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserUseCase implements IUseCase<IRequest, IUser> {
    constructor(
        private usersRepository: IUserRepository,
        private cryptography: ICryptography
    ) { }

    async execute({
        name,
        email,
        password,
    }: IRequest): Promise<IUser> {
        const userExists = await this.usersRepository.findByEmail(email);

        const encryptedPassword = await this.cryptography.encrypt(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: encryptedPassword,
        });

        return user;
    }
}

export { CreateUserUseCase };
