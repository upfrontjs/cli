import { finish, ucFirst } from '../../helpers/string';
import type { Extension } from '../../constants';
import { upfrontJs } from '../../constants';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { touch } from '../../helpers/file';

export default function (
    name: string,
    extension: Extension,
    modelDir: string,
    factoriesDir: string
): string {
    name = ucFirst(name);
    factoriesDir = finish(factoriesDir, path.sep);

    if (fs.existsSync(factoriesDir + name + 'Factory.' + extension)) {
        console.warn(chalk.yellow(
            'Factory named \'' + name + 'Factory.' + extension + '\' already exists at: ' + factoriesDir)
        );

        return path.resolve(__dirname + path.sep + factoriesDir + name + 'Factory.' + extension);
    }

    const filePath = touch(factoriesDir + name + 'Factory.' + extension);
    let data = fs.readFileSync(path.resolve(__dirname + '/stubs/ModelFactory.' + extension + '.stub'), 'utf-8');

    data = 'import type ' + name + ' from \''
        + finish(path.relative(process.cwd() + path.sep + factoriesDir, process.cwd() + path.sep + modelDir), path.sep)
        + name + '\';\n'
        + data.replaceAll('{{NAME}}', name)
            .replaceAll('{{NAME_LOWER}}', name.toLowerCase())
            .replaceAll('{{PACKAGE_NAME}}', upfrontJs.folder + path.sep + upfrontJs.packages.framework);

    fs.writeFileSync(filePath, data, 'utf8');
    console.log(chalk.green(name + 'Factory.' + extension + ' created.'));

    return filePath;
}
