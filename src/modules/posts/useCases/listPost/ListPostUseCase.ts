import { IListUseCaseParams } from "@/shared/protocols/IListUseCase";
import { IUseCase } from "@/shared/protocols/IUseCase";
import { ICurrentPageValidation } from "@/shared/utils/pagination/adapters/ICurrentPageValidation";
import { IOffsetGenerator } from "@/shared/utils/pagination/adapters/IOffset";
import { ITotalPagesGenerator } from "@/shared/utils/pagination/adapters/ITotalPagesGenerator";
import { IPaginationResponse } from "@/shared/utils/pagination/interfaces/IPaginationResponse";

import { IPost } from "../../model/IPost";
import { IPostRepository } from "../../repositories/IPostRepository";

interface IRequest {
    limit?: number;
    page?: number;
}

class ListPostUseCase implements IUseCase<IRequest, IPaginationResponse<IPost>> {
    constructor(
        private postsRepository: IPostRepository,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation
    ) { }

    async execute({
        limit,
        page
    } : IRequest): Promise<IPaginationResponse<IPost>> {
        const offset = this.offsetGenerator.generate({ limit, page });

        const result = await this.postsRepository.list({
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: result.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: result.posts,
            currentPage: page ?? 0,
            totalPages: totalPages || 0,
            totalRegisters: result.count,
        };
    }
}

export { ListPostUseCase };
