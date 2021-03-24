import chalk from 'chalk';
import type { Documentation } from '../../constants';

/**
 * Create the string to be logged to the console.
 *
 * @param {string} name
 * @param {Documentation} doc
 */
export default function (name: string, doc: Documentation): string {
    let documentation = `
    ${chalk.bold.whiteBright(name.toUpperCase())}
    
    ${chalk.bold.underline('Synopsis')}
        ${doc.synopsis}
`;

    if (doc.options) {
        documentation += '    ' + chalk.bold.underline('Options') + '\n';

        // todo - make this into a table for easier scanning
        doc.options.forEach(option => {
            documentation += '       '
                + option.argument + ' => ' + option.description
                + (option.default ? ' Default: ' + option.default : '')
                + '\n';
        });
    }

    if (doc.examples) {
        documentation += '    ' + chalk.bold.underline('Examples') + '\n';

        doc.examples.forEach(example => {
            documentation += '       ' + example + '\n';
        });
    }

    return documentation;
}
