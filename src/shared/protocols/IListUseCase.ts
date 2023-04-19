import { IPaginationResponse } from "../utils/pagination/interfaces/IPaginationResponse";

export interface IListUseCaseParams {
    isAdmin: boolean;
    search?: string;
    limit?: number;
    page?: number;
    orderBy?: string;
    orderMode?: string;
    userGuid: string;
}

export interface IListPaginatedUseCase<Entity> {
    execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<Entity>>;
}

export interface IListUseCase<Entity> {
    execute({ search, limit, page }: IListUseCaseParams): Promise<Entity[]>;
}
