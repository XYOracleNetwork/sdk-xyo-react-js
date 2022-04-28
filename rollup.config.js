import { getRollupConfig } from '@xylabs/rollup-config'

import pkg from './package.json'

// eslint-disable-next-line import/no-default-export
export default getRollupConfig({
  additionalNodeExternals: ['fs', 'fs/promises', 'path', 'querystring', 'url'],
  browserIndex: './src/browserIndex.ts',
  bundlePrefix: 'bundle/',
  nodeIndex: './src/nodeIndex.ts',
  outputs: ['node', 'node-esm'],
  pkg,
})
