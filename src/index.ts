import minimist from 'minimist';
import { getHelp, printHelp } from './commands/help';
import delegateMakeCommand from './commands/make';
import chalk from 'chalk';
import type { Command, ParsedArgs } from './constants';
import { availableCommands } from './constants';


const args = minimist(process.argv.slice(2), {
    boolean: true,
    string: ['modelDir', 'factoryDir'],
    alias: {
        factory: 'f',
        model: 'm',
        help: 'h',
        typescript: 't'
    },
    default: {
        modelDir: './src/Models',
        factoryDir: './factories',
        typescript: false,
        factory: false,
        model: false
    }
}) as ParsedArgs;

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
    // @ts-expect-error
    || availableCommands.indexOf(args.command) === -1
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
        delegateMakeCommand(args);
        break;
}

console.error(chalk.red.bold(
    'Impossible logic path reached, please create an issue on: https://github.com/nandi95/upfront-cli'
));
process.exit(1);
