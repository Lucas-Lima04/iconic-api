export interface ICryptography {
    encrypt: (value: string) => Promise<string>;
    compare: (password: string, encryptedPassword: string) => Promise<boolean>;
}
