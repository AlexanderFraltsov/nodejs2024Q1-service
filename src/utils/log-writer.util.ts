import { join } from 'node:path';

import { Subject, concatMap } from 'rxjs';

import { FileUtils } from './file.utils';

export class LogWriter {
  private pathToLogsFolder = join(__dirname, '..', '..', '/logs');

  private maxFileSize = 0;

  public logsQueue = new Subject<string>();

  public errorsQueue = new Subject<string>();

  constructor(maxFileSize: number) {
    this.maxFileSize = maxFileSize;
  }

  init = async () => {
    await FileUtils.createFolderIfNotExist(this.pathToLogsFolder);

    this.logsQueue.pipe(concatMap((msg) => this.writeMessage(msg))).subscribe();

    this.errorsQueue
      .pipe(concatMap((msg) => this.writeMessage(msg, 'errors')))
      .subscribe();
  };

  writeMessage = async (
    message: string,
    prefix: 'errors' | 'logs' = 'logs',
  ) => {
    const logFiles = await FileUtils.getFilenamesWithPrefix(
      this.pathToLogsFolder,
      prefix,
    );

    let logCount = 0;
    if (logFiles.length) {
      const lastFilename = logFiles.at(-1);
      const size = await FileUtils.getFileSize(
        join(this.pathToLogsFolder, lastFilename),
      );
      logCount = this.updateLogCounts(lastFilename, prefix, size);
    }

    await FileUtils.appendStringToFile(
      join(this.pathToLogsFolder, `${prefix}-${logCount}.log`),
      message,
    );
  };

  updateLogCounts = (
    lastFilename: string,
    prefix: 'errors' | 'logs',
    size: number,
  ) => {
    const [, lastPart] = lastFilename.split('-');
    const [index] = lastPart.split('.');
    const logCount = Number.parseInt(index);

    if (size >= this.maxFileSize) {
      return logCount + 1;
    }
    return logCount;
  };
}
