export interface IModel {
    createdAt: Date;
    updatedAt: Date;
    _count: Record<string, number> | null;
}
