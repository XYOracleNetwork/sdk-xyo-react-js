import type { KnipConfig } from 'knip'

const ignoreDependencies = [
  '@xylabs/ts-scripts-yarn3',
]

const rootIgnoreDependencies = [
  ...ignoreDependencies,
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint',
  'eslint-import-resolver-typescript',
]

const entry = ['src/index.ts', 'src/index-node.ts', 'src/index-browser.ts', '*.ts', '*.mjs']
const project = ['src/**/*.ts*']

const config: KnipConfig = {
  ignoreDependencies: rootIgnoreDependencies,
  entry,
  project,
  workspaces: {},
}

export default config
