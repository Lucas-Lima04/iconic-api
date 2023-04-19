import { PostPrismaFactory } from "../../factories/implementations/PostPrismaFactory";
import { PostsPrismaRepository } from "../../repositories/implementations/PostPrismaRepository";

import { CreatePostController } from "./CreatePostController";
import { CreatePostUseCase } from "./CreatePostUseCase";

const postFactory = new PostPrismaFactory();
const postsRepository = new PostsPrismaRepository(postFactory);

const createPostUseCase = new CreatePostUseCase(
    postsRepository
);


const createPostController = new CreatePostController(
    createPostUseCase,
);

export { createPostController };
