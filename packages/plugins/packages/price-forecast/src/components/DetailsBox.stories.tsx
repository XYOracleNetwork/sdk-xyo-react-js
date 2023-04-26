import { Meta, StoryFn } from '@storybook/react'

import { ForecastPayloadSchema } from '../lib'
import { PriceForecastDetailsBox } from './DetailsBox'

const tenMin = 600000

const ForecastingDivinerPayload = {
  schema: ForecastPayloadSchema,
  values: [1, 2, 3, 4, 5, 6, 7, 8].map((item) => ({
    error: 0,
    timestamp: Date.now() + tenMin * item,
    value: 1000 * Math.random(),
  })),
}

const StorybookEntry = {
  argTypes: {},
  component: PriceForecastDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/price-forecast/DetailsBox',
} as Meta<typeof PriceForecastDetailsBox>

const Template: StoryFn<typeof PriceForecastDetailsBox> = (args) => {
  return <PriceForecastDetailsBox {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payload: ForecastingDivinerPayload,
}

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
