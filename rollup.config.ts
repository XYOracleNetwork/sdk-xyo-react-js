import typescript from 'rollup-plugin-typescript2'

export default [
  {
    external: [
      '@emotion/react',
      '@emotion/styled',
      '@material-ui/core',
      '@xyo-network/sdk-xyo-js',
      'axios',
      'lodash',
      'numeral',
      'query-string',
      'randombytes',
      'react',
      'react-cookie-consent',
      'react-dom',
      'react-helmet',
      'react-icons',
      'react-router-dom',
    ],
    input: './src/index.ts',
    output: [
      {
        exports: 'auto',
        file: './dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        exports: 'auto',
        file: './dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
  },
]
