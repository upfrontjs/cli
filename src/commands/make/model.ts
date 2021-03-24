import { finish, ucFirst } from '../../helpers/string';
import fs from 'fs';
import chalk from 'chalk';
import { touch } from '../../helpers/file';
import path from 'path';
import { upfrontJs } from '../../constants';
import { plural } from 'pluralize';


export default function (
    name: string,
    extension: 'ts' | 'js',
    modelsDir: string,
    withFactory: boolean,
    factoriesRelativeDir: string
): string {
    name = ucFirst(name);
    modelsDir = finish(modelsDir, path.sep);

    if (fs.existsSync(modelsDir + name + '.' + extension)) {
        console.warn(chalk.yellow(
            'Model named \'' + name + '.' + extension + '\' already exists at: ' + modelsDir)
        );

        return path.resolve(__dirname + path.sep + modelsDir + name + '.' + extension);
    }

    const filePath = touch(modelsDir + name + '.' + extension);
    let data = fs.readFileSync(path.resolve(__dirname + '/stubs/Model.' + extension + '.stub'), 'utf-8');

    if (withFactory) {
        data = 'import ' + name + 'Factory from \''
            + finish(factoriesRelativeDir, path.sep) + name + 'Factory\';\n'
            + data;

        if (extension === 'ts') {
            data = 'import type Factory from \''
                + upfrontJs.folder + path.sep + upfrontJs.packages.framework
                + '\';\n' + data;
        }

        data = data.replaceAll('{{FACTORY}}', getFactoryMethodLiteral(extension));
    } else {
        data = data.split('\n').filter(line => !line.includes('{{FACTORY}}')).join('\n');
    }

    data = data.replaceAll('{{NAME}}', name)
        .replaceAll('{{NAME_PLURAL_LOWER}}', plural(name.toLowerCase()))
        .replaceAll('{{PACKAGE_NAME}}', upfrontJs.folder + path.sep + upfrontJs.packages.framework);

    fs.writeFileSync(filePath, data, 'utf8');
    console.log(chalk.green(name + '.' + extension + ' created.'));

    return filePath;
}

function getFactoryMethodLiteral(type: 'ts' | 'js') {
    return '\n    /**\n' +
        '     * The factory for the {{NAME}} model.\n' +
        '     *\n' +
        '     * @return {{{NAME}}Factory}\n' +
        '     */\n' +
        '    ' + (type === 'ts' ? 'public ' : '') + 'factory()' + (type === 'ts' ? ': Factory<this>' : '') + ' {\n' +
        '        return new {{NAME}}Factory;\n' +
        '    }';
}
