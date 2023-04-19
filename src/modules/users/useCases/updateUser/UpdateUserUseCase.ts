import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ICryptography } from "@/shared/infra/adapters/cryptography/ICryptography";
import { IUseCase } from "@/shared/protocols/IUseCase";

import { IUser } from "../../model/IUser";
import { IUserRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    guid: string;
    name: string;
    newPassword: string;
    currentPassword: string;
}

export class UpdateUserUseCase implements IUseCase<IRequest, IUser> {
    constructor(
        private usersRepository: IUserRepository,
        private cryptography: ICryptography
    ) { }

    async execute({
        guid,
        name,
        newPassword,
        currentPassword,
    }: IRequest): Promise<IUser> {
        const userExists = await this.usersRepository.findByGuid(guid);

        if (!userExists) {
            throw new ErrorHandler("User not found", HttpStatusCode.NOT_FOUND);
        }

        let encryptedPassword: string | undefined;

        if (newPassword || currentPassword) {
            if (
                (newPassword && !currentPassword) ||
                (!newPassword && currentPassword)
            ) {
                throw new ErrorHandler(
                    "The parameters 'newPassword' and 'currentPassword' are required if one of then is provided.",
                    HttpStatusCode.BAD_REQUEST
                );
            }

            if (newPassword === currentPassword) {
                throw new ErrorHandler(
                    "The new password should not be the same as the old password.",
                    HttpStatusCode.BAD_REQUEST
                );
            }

            if (userExists.encryptedPassword) {
                const isPasswordEqual = await this.cryptography.compare(
                    currentPassword,
                    userExists.encryptedPassword
                );

                if (!isPasswordEqual) {
                    throw new ErrorHandler(
                        "Incorrect password.",
                        HttpStatusCode.BAD_REQUEST
                    );
                }
            }

            encryptedPassword = await this.cryptography.encrypt(newPassword);
        }

        const user = await this.usersRepository.update({
            guid,
            name: name?.trim(),
            encryptedPassword,
        });

        return user;
    }
}
