// Import required AWS SDK clients and commands for Node.js.
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import config from "../config/config.js";
// Set the AWS Region.
const REGION = "eu-north-1";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

async function storeFile(file, id, s3Bucket, contentType) {
  const filePath = `${config.filesPath}${file.originalname}`;
  const filestream = await fs.createReadStream(filePath);

  const params = {
    Key: `${id}.${mime.extension(file.mimetype)}`,
    Body: filestream,
    Bucket: s3Bucket,
    ContentType: contentType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
  } catch (err) {
    console.log("Error", err); // todo: log appropriate errors
  }

  fs.unlink(filePath, (err) => {
    if (err) throw err;
    // todo: log appropriate errors
  });
}

export default storeFile;
