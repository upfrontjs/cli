import type { ParsedArgs } from '../../constants';
import { printHelp } from '../help';
import chalk from 'chalk';
import makeFactory from './factory';
import makeModel from './model';

export default function (args: ParsedArgs): void {
    const moduleToMake = String(args._.shift()).toLowerCase();
    let moduleName = args._.shift();
    const extension = args.typescript ? 'ts' : 'js';

    if (!['factory', 'model'].includes(moduleToMake) || !moduleName) {
        console.error(chalk.red.italic('Invalid module name given: \'' + String(moduleName) + '\'.'));

        printHelp('make');
        process.exit(1);
    }

    moduleName = String(moduleName);

    if (moduleToMake === 'model' || args.model) {
        makeModel(
            moduleName,
            extension,
            String(args.modelDir),
            String(args.factoryDir),
            moduleToMake === 'factory' || args.factory
        );
    }

    if (moduleToMake === 'factory' || args.factory) {
        makeFactory(
            moduleName,
            extension,
            String(args.modelDir),
            String(args.factoryDir)
        );
    }

    process.exit(0);
}
