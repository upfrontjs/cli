import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy'
import pkg from './package.json';

/**
 * @type {import('rollup/dist/rollup').RollupOptions}
 */
const rollupConfig = {
    input: 'src/index.ts',
    output: [
        {
            file: 'cli.js',
            format: 'cjs',
            banner: '#!/usr/bin/env node'
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies)
    ],
    plugins: [
        resolve(),
        typescript(),
        copy({
            targets: [
                { src: './src/commands/make/stubs', dest: './'}
            ],
            copyOnce: true
        })
    ]
};

export default rollupConfig;
