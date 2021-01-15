import fs from 'fs';
import path from 'path';
import { finish } from './string';

const cwd = finish(process.cwd(), path.sep);

/**
 * Create file if doesn't exists at any depth.
 *
 * @param {string} fileName
 */
export function touch(fileName: string): string {
    const filePath = cwd + fileName;

    if (path.dirname(fileName) !== '.') {
        fs.mkdirSync(path.dirname(fileName), { recursive: true });
    }

    fs.closeSync(fs.openSync(path.basename(filePath), 'a'));

    return filePath;
}
