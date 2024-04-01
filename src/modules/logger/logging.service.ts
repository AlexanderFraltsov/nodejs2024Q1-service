import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Subject } from 'rxjs';

const ENDING = '\x1b[0m';
enum LogColors {
  YELLOW = '\x1b[33m',
  CYAN = '\x1b[36m',
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  MAGENTA = '\x1b[35m',
}

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor(
    private readonly configService: ConfigService,
    private logsQueue: Subject<string>,
    private errorsQueue: Subject<string>,
  ) {
    super();

    const { maxLevel } = this.configService.get<{
      maxLevel: number;
    }>('logger');

    if (maxLevel <= 4) {
      const allLogLevels: LogLevel[] = [
        'verbose',
        'debug',
        'log',
        'warn',
        'error',
      ];

      this.setLogLevels(allLogLevels.slice(4 - maxLevel));
    }
  }

  log(message: any, stack?: string) {
    this.writeLog(message, stack, 'log');
    super.log(this.getColoredMessage(message, stack, LogColors.GREEN));
  }

  error(message: any, stack?: string) {
    this.writeLog(message, stack, 'error');
    super.error(this.getColoredMessage(message, stack, LogColors.RED));
  }

  warn(message: any, stack?: string) {
    this.writeLog(message, stack, 'warn');
    super.warn(this.getColoredMessage(message, stack, LogColors.YELLOW));
  }

  verbose(message: any, stack?: string) {
    this.writeLog(message, stack, 'verbose');
    super.verbose(this.getColoredMessage(message, stack, LogColors.CYAN));
  }

  debug(message: any, stack?: string) {
    this.writeLog(message, stack, 'debug');
    super.debug(this.getColoredMessage(message, stack, LogColors.MAGENTA));
  }

  private getColoredText(text: string, color: LogColors) {
    return `${color}${text}${ENDING}`;
  }

  private getColoredMessage(message: any, stack: string, color: LogColors) {
    const brackedStack = `[${stack}]`;
    return `${this.getColoredText(
      brackedStack,
      LogColors.YELLOW,
    )} ${this.getColoredText(message.toString(), color)}`;
  }

  private writeLog(message: any, stack: string, logLevel: LogLevel) {
    const brackedStack = `[${stack}]`;
    const date = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    });

    const msg = `[NEST] ${process.pid}  - ${date} ${logLevel
      .toUpperCase()
      .padStart(7, ' ')} ${brackedStack} ${message.toString()}`;

    const errorLevels: LogLevel[] = ['warn', 'error'];

    if (errorLevels.includes(logLevel)) {
      this.errorsQueue.next(msg);
    }

    this.logsQueue.next(msg);
  }
}
