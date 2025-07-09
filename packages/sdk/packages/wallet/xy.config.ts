import type { XyTsupConfig } from '@xylabs/ts-scripts-yarn3'
const config: XyTsupConfig = {
  compile: {
    browser: { src: true },
    node: {},
    neutral: {},
    tsup: { options: { outDir: 'build' } },
  },
}

export default config
