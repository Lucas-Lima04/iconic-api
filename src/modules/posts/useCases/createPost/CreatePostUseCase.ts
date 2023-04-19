import { IUseCase } from "@/shared/protocols/IUseCase";

import { IPost } from "../../model/IPost";
import { IPostRepository } from "../../repositories/IPostRepository";

interface IRequest {
    path: string;
    userGuid: string;
}

class CreatePostUseCase implements IUseCase<IRequest, IPost> {
    constructor(
        private postsRepository: IPostRepository,
    ) { }

    async execute({
        path,
        userGuid
    }: IRequest): Promise<IPost> {
        
        const post = await this.postsRepository.create({
            path,
            userGuid
        });

        return post;
    }
}

export { CreatePostUseCase };
