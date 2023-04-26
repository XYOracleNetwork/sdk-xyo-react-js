import { Meta, StoryFn } from '@storybook/react'

import { PriceForecastDetailsBox } from './DetailsBox'

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

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
