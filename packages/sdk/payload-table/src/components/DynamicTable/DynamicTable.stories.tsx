import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UniswapPairsRenderPlugin } from '@xyo-network/react-crypto-market-uniswap-payload-plugin'
import { DefaultPayloadRenderPlugin, PayloadRenderPluginResolverProvider, XyoPayloadRenderPluginResolver } from '@xyo-network/react-payload-plugin'
import { samplePayload, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { PayloadDynamicTable } from './Table'

const StorybookEntry = {
  argTypes: {},
  component: PayloadDynamicTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/DynamicTable',
} as ComponentMeta<typeof PayloadDynamicTable>

const Template: ComponentStory<typeof PayloadDynamicTable> = (args) => (
  <PayloadRenderPluginResolverProvider
    resolver={new XyoPayloadRenderPluginResolver().register(UniswapPairsRenderPlugin).register(DefaultPayloadRenderPlugin)}
  >
    <BrowserRouter>
      <PayloadDynamicTable {...args}></PayloadDynamicTable>
    </BrowserRouter>
  </PayloadRenderPluginResolverProvider>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [useAppThemeDecorator]

const WithData = Template.bind({})
WithData.args = { payloads: [samplePayload, samplePayload] }
WithData.decorators = [useAppThemeDecorator]

const WithError = Template.bind({})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { _hash, ...badPayload } = samplePayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
WithError.args = { payloads: [samplePayload, badPayload] }

export { Default, WithData, WithError }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
