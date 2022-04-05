import { getRollupConfig } from '@xylabs/rollup-config'

import pkg from './package.json'

// eslint-disable-next-line import/no-default-export
export default getRollupConfig({
  additionalNodeExternals: ['fs', 'path'],
  browserIndex: './src/browserIndex.ts',
  nodeIndex: './src/nodeIndex.ts',
  pkg,
})
