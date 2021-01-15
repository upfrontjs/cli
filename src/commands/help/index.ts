// import inquirer from 'inquirer';
import type { Command, ParsedArgs } from '../../constants';
import { availableCommands, documentation } from '../../constants';
import makeDoc from './makeDoc';

export function getHelp(args?: ParsedArgs): void {
    let command: Command;

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    console.log('command - ' + args?.command);
    if (!args?.command
        || args.command === 'help'
        // @ts-expect-error
        || !availableCommands.includes(args.command)
    ) {
        command = 'help';
        // command = inquirer.prompt([
        //     {
        //         type: 'list',
        //         name: 'command',
        //         message: 'Need help with:',
        //         choices: availableCommands.filter(cmd => cmd !== 'help'),
        //         default: availableCommands[0]
        //     }
        // ]);
    } else {
        command = args.command as Command;
    }

    printHelp(command);
}

export function printHelp(about: Command): void {
    console.log(makeDoc(about, documentation[about]));
}
