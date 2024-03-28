import { ConsoleLogger, Injectable } from '@nestjs/common';

const ENDING = '\x1b[0m';
enum LogColors {
	YELLOW = '\x1b[33m',
	CYAN = '\x1b[36m',
	RED = '\x1b[31m',
	GREEN = '\x1b[32m',
	MAGENTA = '\x1b[35m',
};

@Injectable()
export class CustomLogger extends ConsoleLogger {
	private getColoredText(text: string, color: LogColors) {
		return `${color}${text}${ENDING}`;
	}

	private getColoredMessage(message: any, stack: string, color: LogColors) {
		const brackedStack = `[${stack}]`;
		return `${this.getColoredText(brackedStack, LogColors.YELLOW)} ${this.getColoredText(message.toString(), color)}`;
	}

  log(message: any, stack?: string, context?: string) {
    super.log(this.getColoredMessage(message, stack, LogColors.GREEN));
  }

  error(message: any, stack?: string, context?: string) {
    super.error(this.getColoredMessage(message, stack, LogColors.RED));
  }

  warn(message: any, stack?: string, context?: string) {
    super.warn(this.getColoredMessage(message, stack, LogColors.YELLOW));
  }

  verbose(message: any, stack?: string, context?: string) {
    super.verbose(this.getColoredMessage(message, stack, LogColors.CYAN));
  }

  debug(message: any, stack?: string, context?: string) {
    super.debug(this.getColoredMessage(message, stack, LogColors.MAGENTA));
  }
}
