import { IPost } from "../model/IPost";

interface ICreatePostDTO {
    path: string;
    userGuid: string;
}

export interface IListPostsRequest {
    search?: string;
    limit?: number;
    offset?: number;
    orderParams?: any;
}

export interface IListPostsResponse {
    posts: IPost[];
    count: number;
}


interface IPostRepository {
    create(params: ICreatePostDTO): Promise<IPost>;
    list(params: IListPostsRequest): Promise<{
        posts: IPost[];
        count: number;
    }>;
}

export {
    IPostRepository,
    ICreatePostDTO,
};
