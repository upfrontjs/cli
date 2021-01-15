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

        Object.keys(doc.options).forEach(optionUsage => {
            documentation += '       '
                + optionUsage
                // @ts-expect-error
                + (doc.options[optionUsage] ? ' => ' + String(doc.options[optionUsage]) : '')
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
