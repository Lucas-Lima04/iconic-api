export interface IUseCase<PARAMS, ENTITY> {
    execute: (data: PARAMS) => Promise<ENTITY>;
}
