import type { PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { createPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PriceForecastDetailsBox } from './components/index.ts'

export const PriceForecastRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: { box: { detailsBox: PriceForecastDetailsBox } },
    name: 'PriceForecast',
  }),
}
