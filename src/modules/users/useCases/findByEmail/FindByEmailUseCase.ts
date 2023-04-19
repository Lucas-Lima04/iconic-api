import { IUseCase } from "@/shared/protocols/IUseCase";

import { IUser } from "../../model/IUser";
import { IUserRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
}

class FindByEmailUseCase implements IUseCase<IRequest, IUser | undefined> {
    constructor(
        private usersRepository: IUserRepository,
        ) {}

    async execute({ email }: IRequest): Promise<IUser | undefined> {        
        const user = await this.usersRepository.findByEmail(email);
        return user;
    }
}

export { FindByEmailUseCase };
