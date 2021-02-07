import type { ParsedArgs as MParsedArgs } from 'minimist';

export const supportedVersions = ['^0.1.0'];
export const availableCommands = ['help', 'make'] as const;
export const upfront = {
    folder: '@upfrontjs',
    packages: {
        cli: 'cli',
        framework: 'framework'
    }
};

export type Command = typeof availableCommands[number];
export type ParsedArgs = MParsedArgs & { command: Command | string | undefined };

export interface Documentation {
    synopsis: string;
    options?: Record<string, string>;
    examples?: string[];
}

export const documentation = {
    make: {
        synopsis: 'Generate the required modules in your project.',
        options: {
            '--factory -f': 'Flag indicating that a factory is also required.',
            '--typescript -t': 'Flag indicating to generate typescript files instead of javascript files',
            '--modelDir=': 'The relative path of the models directory. Default: \'./src/Models\'',
            '--factoryDir=': 'The relative path of the source directory. Default: \'./factories\''
        },
        examples: ['- upfront make:model User -ft']
    },

    help: {
        synopsis: 'Command line utility for the upfront npm package.',
        options: {
            make: 'Generate the required modules in your project.'
        },
        examples: ['- upfront make:[some module]']
    }
} as Record<Command, Documentation>;
