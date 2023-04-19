//import { context } from "@/shared/infra/database/Context";
import { context } from "../../../../shared/infra/database/Context";
import { PrismaClient, User as PrismaUser, User } from "@prisma/client";
import { IPrismaUserFactory } from "../../factories/implementations/UserPrismaFactory";
import { IUserFactory } from "../../factories/IUserFactory";
import { IUser } from "../../model/IUser";
import {
    ICreateUserDTO,
    IUserRepository,
    IUpdateUserDTO,
} from "../IUsersRepository";

class UsersPrismaRepository implements IUserRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly userFactory: IUserFactory<IPrismaUserFactory>
    ) {
        this.prismaClient = context.prisma;
    }
    
    
    async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<IUser> {
        const userP = await this.prismaClient.user.create({
            data: {
                name,
                email,
                encryptedPassword: password,
            },
        });

        return this.userFactory.generateFactoryObject(userP);
    }

    async update({
        guid,
        name,
        email,
        encryptedPassword,
    }: IUpdateUserDTO): Promise<IUser> {
        const data = {
            guid,
            name,
            email,
            encryptedPassword,
        }
        const user = await this.prismaClient.user.update({
            where: { guid },
            data,
        });

        return this.userFactory.generateFactoryObject(user);
    }



    async findByGuid(guid: string): Promise<IUser | undefined> {
        if (!guid) {
            return undefined;
        }

        const user = await this.prismaClient.user.findFirst({
            where: { guid },
        });


        return user ? this.userFactory.generateFactoryObject(user) : undefined;
    }

    
    async findByEmail(email: string, hospitalGuid?: string): Promise<IUser | undefined> {
        if (!email) {
            return undefined;
        }

        const user = await this.prismaClient.user.findFirst({
            where: { email },
        });

        return user ? this.userFactory.generateFactoryObject(user) : undefined;
    }
}
export { UsersPrismaRepository };
