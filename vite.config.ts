import react from '@vitejs/plugin-react-swc'
import { config } from 'dotenv'
import { defineConfig } from 'vite'
import Checker from 'vite-plugin-checker'
import topLevelAwait from 'vite-plugin-top-level-await'
import tsconfigPaths from 'vite-tsconfig-paths'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TopLevelAwaitPlugin = topLevelAwait as any

config()

const parsedPort = Number.parseInt(process.env.PORT ?? '')
const port = Number.isNaN(parsedPort) ? 3000 : parsedPort

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    Checker({ typescript: { tsconfigPath: process.env.TS_NODE_PROJECT } }),
    tsconfigPaths(),
    {
      ...TopLevelAwaitPlugin({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        promiseImportName: (i: any) => `__tla_${i}`,
      }),
      apply: 'serve',
    }],
  build: {
    sourcemap: true,
    rollupOptions: { output: { entryFileNames: 'assets/index-main-[hash].js' } },
    outDir: 'build',
  },
  server: { port },
})
