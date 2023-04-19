import { CurrentPageValidation } from "@/shared/utils/pagination/adapters/implementations/CurrentPageValidation";
import { OffsetGenerator } from "@/shared/utils/pagination/adapters/implementations/Offset";
import { TotalPagesGenerator } from "@/shared/utils/pagination/adapters/implementations/TotalPagesGenerator";
import { PostPrismaFactory } from "../../factories/implementations/PostPrismaFactory";
import { PostsPrismaRepository } from "../../repositories/implementations/PostPrismaRepository";

import { ListPostController } from "./ListPostController";
import { ListPostUseCase } from "./ListPostUseCase";

const postFactory = new PostPrismaFactory();
const postsRepository = new PostsPrismaRepository(postFactory);


const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const currentPageValidation = new CurrentPageValidation();

const listPostUseCase = new ListPostUseCase(
    postsRepository,
    offsetGenerator,
    totalPagesGenerator,
    currentPageValidation
);


const listPostController = new ListPostController(
    listPostUseCase,
);

export { listPostController };
