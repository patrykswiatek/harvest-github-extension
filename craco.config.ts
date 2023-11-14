import {
  BaseContext,
  CracoEsLintConfig,
  CracoPluginDefinition,
  WebpackConfigOverride,
} from '@craco/types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAlias = require('craco-alias')

const eslint: CracoEsLintConfig = {
  configure: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    env: {
      node: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
    ],
    rules: {
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'unknown',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
}

function getWebpackConfig() {
  return {
    configure: (
      config: WebpackConfigOverride['webpackConfig'],
      { env, paths }: BaseContext
    ) => {
      const scopePluginIndex = config?.resolve?.plugins?.findIndex(
        (data) => data?.constructor?.name === 'ModuleScopePlugin'
      )
      config?.resolve?.plugins?.splice(scopePluginIndex ?? 0, 1)

      return {
        ...config,
        entry: {
          main: [
            env === 'development' &&
              require.resolve('react-dev-utils/webpackHotDevClient'),
            paths?.appIndexJs,
          ].filter(Boolean),
          content: './src/chromeServices/DOMEvaluator.ts',
        },
        resolve: {
          extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
        },
        output: {
          ...config.output,
          filename: 'static/js/[name].js',
        },
        optimization: {
          ...config.optimization,
          runtimeChunk: false,
        },
      }
    },
  }
}

const plugins: CracoPluginDefinition<unknown>[] = [
  {
    plugin: CracoAlias,
    options: {
      source: 'tsconfig',
      baseUrl: './src',
      tsConfigPath: './tsconfig.paths.json',
    },
  },
]

export default { eslint, plugins, webpack: getWebpackConfig() }
