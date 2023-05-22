const cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signUpload = async () => {
  console.log('cloudinary', cloudinary.config());
  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    timestamp,
  };
  const signature = await cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );
  return { timestamp, signature };
};

export const csvUpload = async (
  file: any,
  fileName: string,
  listingId: string
) => {
  const result = await cloudinary.uploader.upload(file.content!, {
    public_id: `${fileName}.csv`,
    asset_folder: 'earn-v2-submissions',
    resource_type: 'raw',
    tags: [listingId],
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return result;
};

export const str2ab = (str: string, fileName: string) => {
  const buffer = Buffer.from(str, 'utf8');
  const parser = new DatauriParser();
  const file64 = parser.format(fileName, buffer);
  return file64;
};

export default cloudinary;
