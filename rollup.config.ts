import typescript from '@rollup/plugin-typescript'

export default [
  {
    external: [
      '@emotion/react',
      '@emotion/styled',
      '@material-ui/core',
      '@material-ui/core/styles',
      '@material-ui/styles',
      '@xyo-network/sdk-xyo-js',
      '@xylabs/pixel',
      'axios',
      'lodash',
      'lodash/isEqual',
      'numeral',
      'query-string',
      'randombytes',
      'react',
      'react/jsx-runtime',
      'react-dom',
      'react-helmet',
      'react-icons',
      'react-icons/ai',
      'react-router-dom',
      'tslib',
    ],
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/index.js',
        format: 'es',
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
]
