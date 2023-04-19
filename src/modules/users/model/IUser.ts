export interface IUser {
    guid: string;
    name: string
    email: string;
    encryptedPassword: string | null;
}
