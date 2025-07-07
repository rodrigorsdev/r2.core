import * as fs from 'fs';

export default class FileUtil {

    static convertCsvPath(path: string): string[] {

        const requestContent = fs.readFileSync(path, 'utf-8');

        return requestContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
    }
}