import {
    Post as PPost,
    User as PUser
} from "@prisma/client";
import { IPost } from "../../model/IPost";
import { IPostFactory } from "../IPostFactory";

export interface IPrismaPostFactory extends PPost {
    post?: PPost | null;
    user?: PUser;
}

export class PostPrismaFactory implements IPostFactory<IPrismaPostFactory> {
    constructor(
    ) { }
    generateFactoryObject(post: IPrismaPostFactory): IPost {

        return {
            guid: post.guid,
            path: process.env.PHOTO_BASE_PATH + post.path,
            userGuid: post.userGuid,
            user: post.user,
            createdAt: post.createdAt
        }
    }
}
