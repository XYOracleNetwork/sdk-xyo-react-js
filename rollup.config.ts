import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  external: ['react'],
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
}
