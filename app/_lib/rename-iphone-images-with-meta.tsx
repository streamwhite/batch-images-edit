import ExifReader from 'exifreader';
import fs from 'fs';
import path from 'path';

export async function renameIphoneImages(
  uploadPath: string,
  outPutFolder: string
) {
  const images = fs.readdirSync(uploadPath);
  for (const image of images) {
    const oldPath = path.join(uploadPath, image);

    const tags = await ExifReader.load(oldPath);
    const {
      GPSLongitude: { description: lng } = {},
      GPSLatitude: { description: lat } = {},
      DateTimeOriginal: { description: datetime } = {},
      FileType: { value: fileType },
    } = tags;
    const formattedDatetime = datetime ? datetime.replace(/[: ]/g, '-') : '';
    const fileName = `${formattedDatetime}-lat-${lat || ''}-lng-${
      lng || ''
    }.${fileType}`;
    const newPath = path.join(outPutFolder, fileName);
    fs.renameSync(oldPath, newPath);
  }
}
