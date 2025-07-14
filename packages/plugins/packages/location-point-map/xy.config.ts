import type { XyTsupConfig } from '@xylabs/ts-scripts-yarn3'
const config: XyTsupConfig = {
  compile: {
    browser: { src: { entry: ['index.ts', 'index-meta.ts'] } },
    node: {},
    neutral: {},
  },
}

export default config
