import stylistic from '@stylistic/eslint-plugin'
import astro from 'eslint-plugin-astro';

export default [
    ...astro.configs.base,
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/indent': [ 'error', 4 ],
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
            '@stylistic/jsx-curly-spacing': [ 'error', {
                when: 'always',
                spacing: {
                    objectLiterals: 'never'
                }
            } ],
            '@stylistic/comma-dangle': [ 'error', 'never' ],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/eol-last': [ 'error', 'never' ]
        }
    }
];