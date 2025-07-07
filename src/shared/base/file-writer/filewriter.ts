import * as fs from 'fs';
import * as path from 'path';

export class FileWriter {

    private readonly _filePath: string;

    constructor(filename: string, folder = '', header: string = '') {
        this._filePath = path.join(process.cwd(), `assets`, folder, filename);
        this.ensureFileExists(header);
    }

    private ensureFileExists(header: string): void {
        if (!fs.existsSync(this._filePath)) {
            fs.writeFileSync(this._filePath, header, 'utf-8');
        }
    }

    writeLine(line: string): void {
        const content = fs.readFileSync(this._filePath, 'utf-8');
        const prefix = content.length > 0 ? '\n' : '';
        fs.appendFileSync(this._filePath, `${prefix}${line}`, 'utf-8');
    }
}
