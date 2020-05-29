module.exports = {
    root: true,
    env: {
        node: true
    },
    'globals': {
        '_': true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-debugger': 'off',
        'no-console': 'off',
        'no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'after-used',
                'ignoreRestSiblings': true
            }
        ],
        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'ignore'
        }]
    },
    'overrides': [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off',
                'vue/script-indent': ['error', 4, { 'baseIndent': 1 }]
            }
        }
    ],
    parserOptions: {
        parser: 'babel-eslint'
    }
};
