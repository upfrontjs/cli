/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import minimist from 'minimist';
import { getHelp, printHelp } from './commands/help';
import make from './commands/make';
import chalk from 'chalk';
import type { Command, ParsedArgs } from './constants';
import { availableCommands } from './constants';
import { supportedVersions } from './constants';
import { getFrameworkVersion, isSupportedVersion } from './helpers/version';

const args = minimist(process.argv.slice(2), {
    boolean: true,
    string: ['modelDir', 'factoryDir'],
    alias: {
        factory: 'f',
        model: 'm',
        help: 'h',
        typescript: 't',
        skipCheck: 's'
    },
    default: {
        modelDir: './src/Models',
        factoryDir: './tests/factories',
        typescript: false,
        factory: false,
        model: false,
        skipCheck: false
    }
}) as ParsedArgs;

if (!args.skipCheck) {
    const ver = getFrameworkVersion();

    if (!isSupportedVersion(ver)) {
        console.log(chalk.bold.red(
            'Unsupported version detected. Ensure one of the following is installed instead of ' + ver
        ));
        supportedVersions.forEach(supportedVersion => console.log(supportedVersion));
        process.exit(1);
    }
}

args.command = String(args._.shift()).toLowerCase();

if (args.command?.includes(':')) {
    const parts = args.command.split(':');
    // treat the first part as the command and
    // put the rest back into the arguments
    args.command = parts.shift() as Command;
    args._.unshift(parts.join(':'));
}

if (!args.command
    || args.command === 'help'
    || availableCommands.indexOf(args.command as Command) === -1
    || args.help
) {
    if (args.help || args.command === 'help') {
        getHelp(args);
        process.exit(0);
    } else {
        printHelp('help');
        process.exit(1);
    }
}

switch (args.command) {
    case 'make':
        make(args);
        break;
}

console.error(chalk.red.bold(
    'Impossible logic path reached, please create an issue on: https://github.com/upfrontjs/cli'
));
process.exit(1);
