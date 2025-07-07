import { Logger, LoggerService } from "@nestjs/common";
import { FileWriter } from "../file-writer/filewriter";

export class CustomLogger implements LoggerService {

    private readonly _logger;

    private static _contextRules: Record<string, number> = {};

    private readonly LOG_LEVEL_MAP: Record<string, number> = {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
    };

    private _pathLogFile: string;
    private _pathLogWriter: FileWriter;

    constructor(
        className: string,
    ) {

        this._logger = new Logger(className);

        if (Object.keys(CustomLogger._contextRules).length === 0)
            this._initializeContextRules();

        this._pathLogFile = `logs.txt`;
        this._pathLogWriter = new FileWriter(this._pathLogFile);
    }

    private _initializeContextRules() {

        //Apenas o AppController e o AppService mostrara os logs debug pra cima, o resto exibira apenas errors
        //context=AppController,AppService;level=debug/level=error

        const rules = process.env.LOG_RULES;

        if (!rules) {
            CustomLogger._contextRules['*'] = this.LOG_LEVEL_MAP['info'];
            return;
        }

        const rulesEntries = rules.split('/');
        for (const rule of rulesEntries) {
            let contextPart = '*';
            let levelPart = 'info';

            const parts = rule.split(';');

            for (const part of parts) {
                if (part.startsWith('context='))
                    contextPart = part.split('=')[1] || contextPart;
                else if (part.startsWith('level='))
                    levelPart = part.split('=')[1] || levelPart;
            }

            const contexts = contextPart.split(',');
            const numericLevel = this.LOG_LEVEL_MAP[levelPart.trim()] || this.LOG_LEVEL_MAP['info'];

            for (const context of contexts) {
                CustomLogger._contextRules[context.trim()] = numericLevel;
            }
        }
    }

    private _getLogLevel(context: string) {
        context = context || '';
        const level = CustomLogger._contextRules[context] ?? CustomLogger._contextRules['*'] ?? this.LOG_LEVEL_MAP['info'];
        return level;
    }

    private _shouldLog(methodLevel: string, context: string) {
        return this.LOG_LEVEL_MAP[methodLevel] >= this._getLogLevel(context);
    }

    private _createTag(tag: string): string {
        return `[${tag.trim().toUpperCase()}]`;
    }

    private _mapToString(params: Record<string, any>): string {
        return params ? Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join(', ') : '';
    }

    private _writeLogFiles(logLevel: string, message: string) {
        this._pathLogWriter.writeLine(`${new Date()} | ${logLevel.toUpperCase()} | ${message}`);
    }

    verbose(tagId: string, functionName: string, message: string, params?: Record<string, any>, context?: string) {
        if (this._shouldLog('verbose', context)) {
            let paramsString = this._mapToString(params);
            const tag = this._createTag(tagId);
            this._logger.trace(`${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
            this._writeLogFiles('VERBOSE', `${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
        }
    }

    async debug(tagId: string, functionName: string, message: string, params?: Record<string, any>, context?: string) {
        if (this._shouldLog('debug', context)) {
            let paramsString = this._mapToString(params);
            const tag = this._createTag(tagId);
            this._logger.debug(`${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
            this._writeLogFiles('DEBUG', `${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
        }
    }

    async log(tagId: string, functionName: string, message: string, params?: Record<string, any>, context?: string) {
        if (this._shouldLog('info', context)) {
            let paramsString = this._mapToString(params);
            const tag = this._createTag(tagId);
            this._logger.log(`${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
            this._writeLogFiles('INFO', `${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
        }
    }

    async warn(tagId: string, functionName: string, message: string, params?: Record<string, any>, context?: string) {
        if (this._shouldLog('warn', context)) {
            let paramsString = this._mapToString(params);
            const tag = this._createTag(tagId);
            this._logger.warn(`${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
            this._writeLogFiles('WARN', `${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
        }
    }

    async error(tagId: string, functionName: string, message: string, params?: Record<string, any>, context?: string) {
        if (this._shouldLog('error', context)) {
            let paramsString = this._mapToString(params);
            const tag = this._createTag(tagId);
            this._logger.error(`${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
            this._writeLogFiles('ERROR', `${tag} | ${functionName} | ${message} ${params ? ' | ' + paramsString : ''}`);
        }
    }
}