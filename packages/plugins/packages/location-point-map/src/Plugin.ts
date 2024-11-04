import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PointMapWithSettingsRenderer } from './components/index.ts'
import PointMapRenderPluginMeta from './meta/index.ts'

export const PointMapRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    ...PointMapRenderPluginMeta,
    components: { box: { detailsBox: PointMapWithSettingsRenderer } },
  }),
}
