import { createPayloadRenderPlugin, PayloadRenderPlugin } from '@xyo-network/react-payload-plugin'

import { PriceForecastDetailsBox } from './components'

export const PriceForecastRenderPlugin: PayloadRenderPlugin = {
  ...createPayloadRenderPlugin({
    canRender: () => true,
    components: {
      box: {
        detailsBox: PriceForecastDetailsBox,
      },
    },
    name: 'PriceForecast',
  }),
}
