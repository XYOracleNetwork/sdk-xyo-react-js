import typescript from '@rollup/plugin-typescript'

export default [
  {
    external: [
      'rollbar',
      'tslib',
      'axios',
      'react/jsx-runtime',
      '@mui/material',
      '@mui/styles',
      '@mui/material/styles',
      '@mui/icons-material',
      'react',
      'react-icons/ai',
      '@xyo-network/sdk-xyo-js',
      'react-helmet',
      'numeral',
      '@xylabs/pixel',
      'query-string',
      'react-router-dom',
      'lodash/clone',
    ],
    input: 'src/index.ts',
    output: [
      {
        exports: 'auto',
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.cjs.json' })],
  },
]
