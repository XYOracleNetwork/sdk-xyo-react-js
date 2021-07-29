import typescript from '@rollup/plugin-typescript'

export default [
  {
    external: [
      'rollbar',
      'tslib',
      'axios',
      'react/jsx-runtime',
      '@material-ui/core',
      'react',
      'react-icons/ai',
      '@material-ui/styles',
      '@xyo-network/sdk-xyo-js',
      'react-helmet',
      '@material-ui/core/styles',
      'numeral',
      '@xylabs/pixel',
      'query-string',
      'react-router-dom',
    ],
    input: 'src/index.ts',
    output: [
      {
        exports: 'auto',
        file: 'dist/index.cjs',
        format: 'cjs',
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.cjs.json' })],
  },
]
