import type { XyTsupConfig } from '@xylabs/ts-scripts-yarn3'
const config: XyTsupConfig = {
  compile: {
    browser: { src: { entry: ['./src/index.ts', './src/meta/index.ts'] } },
    node: {},
    neutral: {},
  },
}

export default config
