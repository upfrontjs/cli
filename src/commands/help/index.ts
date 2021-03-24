// import inquirer from 'inquirer';
import type { Command, ParsedArgs } from '../../constants';
import { availableCommands, documentation } from '../../constants';
import makeDoc from './makeDoc';

export function getHelp(args?: ParsedArgs): void {
    let command: Command;

    if (!args?.command
        || args.command === 'help'
        || !availableCommands.includes(args.command as Command)
    ) {
        command = 'help';
    } else {
        command = args.command as Command;
    }

    printHelp(command);
}

export function printHelp(about: Command): void {
    console.log(makeDoc(about, documentation[about]));
}
