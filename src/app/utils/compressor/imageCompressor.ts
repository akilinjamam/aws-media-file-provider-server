import sharp from "sharp";

export const compressImage = async (buffer: Buffer) => {
  return await sharp(buffer)
    .jpeg({ quality: 70 }) // compression
    .toBuffer();
};
