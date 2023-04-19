import multer from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "",
        secretAccessKey:process.env.AWS_SECRET_KEY || ""
    }
})

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) {
                cb(err, '')
            }

            const fileName = `${hash.toString('hex')}-${file.originalname}`
            cb(null, fileName)
        })
    },
  }),
  s3: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME || "agendoctor-images",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) {
                cb(err, '')
            }

            const fileName = `${hash.toString('hex')}-${file.originalname}`
            cb(null, fileName)
        })
    },
  })
};

const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes['s3'],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req:any, file:any, cb:any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/pjpeg",
      "image/png",
      "application/octet-stream"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};

export default multerConfig;