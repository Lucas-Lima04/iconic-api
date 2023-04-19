import bcrypt, { compare } from "bcrypt";

import { ICryptography } from "../ICryptography";

export class BcryptAdapter implements ICryptography {
    private readonly salt: number;

    constructor(salt: number) {
        this.salt = salt;
    }

    async encrypt(value: string): Promise<string> {
        const hash = await bcrypt.hash(value, this.salt);
        return hash;
    }

    async compare(
        password: string,
        encryptedPassword: string
    ): Promise<boolean> {
        return compare(password, encryptedPassword);
    }
}
