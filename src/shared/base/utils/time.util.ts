import { Logger } from "@nestjs/common";

export default class TimeUtil {

    static getTimeExecution(): number {
        const now = new Date();
        return now.getTime();
    }

    static logTimeDifference(className: string, functionName: string, start: number): void {
        const logger = new Logger(className);
        const end = new Date().getTime();
        let timeDiff = end - start;
        logger.debug(`${functionName} | Time execution: ${timeDiff} ms`);
        timeDiff /= 1000;
        const seconds = Math.round(timeDiff);
        logger.debug(`${functionName} | Time execution: ${seconds} s`);
    }
}