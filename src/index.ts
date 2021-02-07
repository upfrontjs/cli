/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import minimist from 'minimist';
import { getHelp, printHelp } from './commands/help';
import delegateMakeCommand from './commands/make';
import chalk from 'chalk';
import type { Command, ParsedArgs } from './constants';
import { availableCommands } from './constants';
// import { upfront, supportedVersions } from './constants';
// import { Range } from 'semver';
//
// const userPkg: { dependencies: Record<string, string> }= require(process.cwd() + '/package.json');
//
// userPkg.dependencies[upfront.folder + '/' + upfront.packages.framework] = '^0.2.0';

// if (!userPkg.dependencies || !userPkg.dependencies[upfront.folder + '/' + upfront.packages.framework]) {
//     console.log(chalk.bold.red(
//         'Upfront cli requires '
//         + upfront.folder + '/' + upfront.packages.framework
//         + ' to be present in your dependencies.'
//     ));
//     console.log(chalk.bold.red('Please run the following to install it:'));
//     console.log(chalk.yellowBright('npm install ' + upfront.folder + '/' + upfront.packages.framework));
//     process.exit(1);
// }

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// const frameworkVersion = new Range(
//     userPkg.dependencies[upfront.folder + '/' + upfront.packages.framework] as string
// );
//
// if (!supportedVersions.some(supportedVersion => frameworkVersion.intersects(new Range(supportedVersion)))) {
//     console.log(chalk.bold.red(
//         'An unsupported version detected. ensure one of the following is installed instead of: '
//         + String(frameworkVersion.raw)
//     ));
//     supportedVersions.forEach(supportedVersion => console.log(supportedVersion));
//     process.exit(1);
// }

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
    'Impossible logic path reached, please create an issue on: https://github.com/upfrontjs/cli'
));
process.exit(1);
