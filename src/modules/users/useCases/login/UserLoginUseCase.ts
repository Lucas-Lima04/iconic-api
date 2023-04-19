import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IAuthentication } from "@/shared/infra/adapters/authentication/IAuthentication";
import { ICryptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { IUseCase } from "@/shared/protocols/IUseCase";

import { IUser } from "../../model/IUser";
import { IUserRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    user: IUser;
}

class UserLoginUseCase implements IUseCase<IRequest, IResponse> {
    constructor(
        private usersRepository: IUserRepository,
        private authentication: IAuthentication,
        private cryptography: ICryptography,
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (user?.encryptedPassword) {
            const isPasswordEqual = await this.cryptography.compare(
                password,
                user.encryptedPassword
            );
            if (!isPasswordEqual) {
                throw new ErrorHandler(
                    "Email ou senha incorretos. Verifique os campos informados antes de prosseguir com o login.",
                    HttpStatusCode.FORBIDDEN
                );
            }

            const token = this.authentication.generateToken(user);

            return {
                token,
                user,
            };
        } else {
            throw new ErrorHandler(
                "Email ou senha incorretos. Verifique os campos informados antes de prosseguir com o login.",
                HttpStatusCode.FORBIDDEN
            );
        }
    }
}

export { UserLoginUseCase };
