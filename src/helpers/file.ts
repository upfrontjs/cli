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
    const filePath = path.resolve(cwd + fileName);

    if (path.dirname(fileName) !== '.') {
        fs.mkdirSync(path.dirname(fileName), { recursive: true });
    }

    fs.writeFileSync(filePath, '', { flag: 'w' });

    return filePath;
}
