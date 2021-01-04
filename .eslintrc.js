module.exports = {
	env: {
		'jest/globals': true,
	},
	extends: [
		'plugin:jest/recommended',
		'plugin:jest/style',
		'@ghadyani-eslint/node',
		'@ghadyani-eslint/web',
	],
	plugins: [
		'react-hooks',
		'jest',
	],
	rules: {
		'@ghadyani-eslint/arrow-body-parens/parens': 'off', // TEMP. Remove 'off' when fixed in @ghadyani-eslint
		'arrow-parens': [
			'warn',
			'always',
		],
		'import/no-unresolved': [
			'warn',
			{ ignore: ['\\$'] },
		],
		'indent': 'off', // TEMP. Remove 'off' when fixed in @ghadyani-eslint
		'no-unexpected-multiline': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'semi': [
			'warn',
			'never',
		],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
