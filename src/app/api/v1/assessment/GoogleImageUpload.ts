import { Bucket, Storage } from '@google-cloud/storage';
import { ECountry, EStatus, EVisa } from '@prisma/client';
import crypto from 'crypto';

export interface FormatedData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  countryOfCitizenship: ECountry;
  visaInterest: EVisa[];
  description: string;
  status: EStatus;
  resumeUrl: string;
}

export const getGCPCredentials = () => {
  return !process.env.DEVELOPMENT && process.env.GCP_PRIVATE_KEY
    ? {
        credentials: {
          client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GCP_PRIVATE_KEY,
        },
        projectId: process.env.GCP_PROJECT_ID,
      }
    : { keyFilename: 'google-storage.json' };
};

const bucketName = 'love_memo';
const baseFileUrl = `https://storage.googleapis.com/${bucketName}`;

const upload = (fileName: string, blob: File, bucket: Bucket) =>
  new Promise(async (resolve, reject) => {
    const file = bucket.file(fileName);
    const buffer = await blob.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    const stream = file.createWriteStream({
      metadata: { contentType: blob.type },
      resumable: true,
    });
    stream.on('error', (err: Error) => {
      err.message = `::[UPLOAD STREAM ERROR]:: ${err.message}]`;
      reject(err);
    });
    stream.on('finish', () => {
      resolve('ok');
    });
    stream.end(fileBuffer);
  });

export const GoogleImagesUploadUseCase = async (
  formData: FormatedData,
  resume: FormDataEntryValue,
): Promise<FormatedData> => {
  const data = { ...formData };
  const clientHash = crypto.createHash('sha1').update(`${data.firstName}${data.email}`).digest('hex');

  const storage = new Storage(getGCPCredentials());
  const bucket = storage.bucket(bucketName);

  let fileURL = '';
  try {
    if (resume && resume instanceof File) {
      const fileName = `${clientHash}-${resume.name}`;
      fileURL = `${baseFileUrl}/${fileName}`;
      await upload(fileName, resume, bucket);
    }
    data.resumeUrl = fileURL;
    return data;
  } catch (e) {
    if (e instanceof Error) {
      e.message = `::[UPLOAD ERROR]:: ${e.message}`;
    }
    throw e;
  }
};
