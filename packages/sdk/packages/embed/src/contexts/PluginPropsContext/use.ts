import { useContextEx } from '@xylabs/react-shared'

import { PluginPropsContext } from './context.ts'

export const usePluginProps = (required = false) => useContextEx(PluginPropsContext, 'PluginProps', required)
