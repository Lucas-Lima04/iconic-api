export interface IAuthResponse<ENTITY> {
    token: string;
    admin: ENTITY;
}

export interface IAuthUseCase<PARAMS, ENTITY> {
    execute: (data: PARAMS) => Promise<IAuthResponse<ENTITY>>;
}
