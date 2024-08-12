'use server';

import pino from 'pino';
import {
  deleteFolderRecursive,
  ensureDirAsync,
  writeFileAsync,
} from '../_lib/fs';
import { renameIphoneImages } from '../_lib/rename-iphone-images-with-meta';

const uploadPath = 'uploads';

const logger = pino(
  {
    level: 'info',
  },
  pino.destination('./pino-logger.log')
);

export async function renameIphoneImagesWithMeta(formData: FormData) {
  const images = formData.getAll('image');
  await ensureDirAsync(uploadPath);
  await saveFiles(images);
  const outPutFolder = 'output';

  try {
    await renameIphoneImages(uploadPath, outPutFolder);
  } catch (error) {
    logger.error('An error occurred:', error);
  }

  deleteFolderRecursive(uploadPath);
  return { isCompleted: true };
}

async function saveFiles(files: FormDataEntryValue[]) {
  for (const fileItem of files) {
    const file = fileItem as File;
    try {
      await writeFileAsync(file, uploadPath);
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  }
}
