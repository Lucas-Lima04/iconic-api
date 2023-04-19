//import { context } from "@/shared/infra/database/Context";
import { context } from "../../../../shared/infra/database/Context";
import { PrismaClient, User as PrismaUser, User } from "@prisma/client";
import { IPrismaPostFactory } from "../../factories/implementations/PostPrismaFactory";
import { IPostFactory } from "../../factories/IPostFactory";
import { IPost } from "../../model/IPost";
import {
    
    ICreatePostDTO,
    IListPostsRequest,
    IPostRepository
} from "../IPostRepository";

class PostsPrismaRepository implements IPostRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly postFactory: IPostFactory<IPrismaPostFactory>
    ) {
        this.prismaClient = context.prisma;
    }
    async list({
        limit,
        offset,
    }: IListPostsRequest): Promise<{
        posts: IPost[];
        count: number;
    }> {
        const posts = await this.prismaClient.post.findMany({
            take: limit,
            skip: offset,
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const countPosts = await this.prismaClient.post.count();
        return {
            posts: posts.map(post => this.postFactory.generateFactoryObject(post)),
            count: countPosts
        }
    }
    
    
    async create({
        path,
        userGuid
    }: ICreatePostDTO): Promise<IPost> {
        const postP = await this.prismaClient.post.create({
            data: {
                path,
                userGuid,
                createdAt: new Date()
            },
        });

        return this.postFactory.generateFactoryObject(postP);
    }

    }
export { PostsPrismaRepository };
