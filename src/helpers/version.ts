import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { upfrontJs, supportedVersions } from '../constants';
import { coerce, Range } from 'semver';

export function getFrameworkVersion(): string {
    const pkgJsonPath = path.resolve(process.cwd() + path.sep + 'package.json');

    if (!fs.existsSync(pkgJsonPath)) {
        console.log(chalk.bold.red('package.json not found. Is this the project directory?'));
        process.exit(1);
    }

    const pkg: { dependencies?: Record<string, string> } = require(pkgJsonPath);

    if (!pkg.dependencies
        || pkg.dependencies && !pkg.dependencies[upfrontJs.folder + '/' + upfrontJs.packages.framework]) {
        console.log(chalk.bold.red(
            'Upfront ' + upfrontJs.packages.cli + ' requires '
            + upfrontJs.folder + '/' + upfrontJs.packages.framework
            + ' to be present in your dependencies.'
        ));
        console.log(chalk.bold.red(
            'Please install '
            + chalk.whiteBright(upfrontJs.folder + '/' + upfrontJs.packages.framework)
            + ' before running this command'
        ));
        process.exit(1);
    }

    return pkg.dependencies[upfrontJs.folder + '/' + upfrontJs.packages.framework]!;
}

export function isSupportedVersion(ver: string): boolean {
    const semVer = coerce(ver);

    if (!semVer) {
        console.log(chalk.bold.red('Unable to determine version from the the package.json'));
        process.exit(1);
    }
    const range = new Range(supportedVersions.join(' || '));

    return range.test(semVer);
}
