import { EOL } from 'node:os';
import { existsSync } from 'node:fs';
import { appendFile, mkdir, readdir, stat } from 'node:fs/promises';

const createFolderIfNotExist = async (path: string) => {
  try {
    if (!existsSync(path)) {
      await mkdir(path);
    }
  } catch (err) {
    console.error(err);
  }
};

const getFilenamesWithPrefix = async (path: string, prefix: string) => {
  const filenames = await readdir(path);
  return filenames
    .filter((name) => name.includes(prefix))
    .sort((name1, name2) => {
      const [filename1] = name1.split('.');
      const [filename2] = name2.split('.');
      const [, fileNum1] = filename1.split('-');
      const [, fileNum2] = filename2.split('-');
      const num1 = Number.parseInt(fileNum1);
      const num2 = Number.parseInt(fileNum2);
      return num1 - num2;
    });
};

const appendStringToFile = async (path: string, message: string) => {
  return await appendFile(path, `${message}${EOL}`);
};

const getFileSize = async (path: string) => {
  const { size } = await stat(path);
  return size;
};

export const FileUtils = {
  appendStringToFile,
  createFolderIfNotExist,
  getFilenamesWithPrefix,
  getFileSize,
};
