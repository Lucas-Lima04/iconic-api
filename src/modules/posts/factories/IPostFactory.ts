import { IPost } from "../model/IPost";

export interface IPostFactory<ORM_ENTITY> {
    generateFactoryObject(post: ORM_ENTITY): IPost;
}
