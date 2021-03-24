import type { ParsedArgs as MParsedArgs } from 'minimist';

export const supportedVersions = ['^0.1.0'];
export const availableCommands = ['help', 'make'] as const;
export const upfrontJs = {
    folder: '@upfrontjs',
    packages: {
        cli: 'cli',
        framework: 'framework'
    }
};

export type Command = typeof availableCommands[number];
export type ParsedArgs = MParsedArgs & { command: Command | string | undefined };

interface Option {
    argument: string;
    description: string;
    default?: string;
}

export interface Documentation {
    synopsis: string;
    options?: Option[];
    examples?: string[];
}

export const documentation = {
    make: {
        synopsis: 'Generate the required module(s) in your project.',
        options: [
            {
                argument: '--factory -f',
                description: 'Flag indicating that a factory is also required.'
            },
            {
                argument: '--typescript -t',
                description: 'Flag indicating to generate typescript files instead of javascript files.'
            },
            {
                argument: '--modelDir=',
                description: 'The relative path of the models directory.',
                default: '\'./src/Models\''
            },
            {
                argument: '--factoryDir=',
                description: 'The relative path to the factory directory.',
                default: '\'./factories\''
            }
        ],
        examples: [
            '- upfront make:model User -ft',
            '- upfront make:factory Shift'
        ]
    },

    help: {
        synopsis: 'Command line utility for the upfrontjs package.',
        options: [
            { argument: 'make', description: 'Generate the required modules in your project.' }
        ],
        examples: [
            '- upfront make:[model|factory]'
        ]
    }
} as Record<Command, Documentation>;
