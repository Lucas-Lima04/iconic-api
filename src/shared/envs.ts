import * as dotenv from "dotenv";

dotenv.config();

export const envs = {
    salt: '10',
    jwtSalt: '10',
    nodeEnv: String(process.env.NODE_ENV),
    publicFilesUrl: String(process.env.PUBLIC_FILES_URL),
    publicStaticLocalFilesUrl: String(
        process.env.PUBLIC_STATIC_LOCAL_FILES_URL
    ),
    emailSender: String(process.env.EMAIL_SENDER),
};
