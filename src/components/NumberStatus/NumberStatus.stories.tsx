import { ComponentMeta, ComponentStory } from '@storybook/react'

import NumberStatus from './NumberStatus'

const StorybookEntry = {
  argTypes: {},
  component: NumberStatus,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'NumberStatus',
} as ComponentMeta<typeof NumberStatus>

const NumberStatusTemplate: ComponentStory<typeof NumberStatus> = (args) => <NumberStatus {...args}></NumberStatus>

const Default = NumberStatusTemplate.bind({})
Default.args = {
  title: 'Default',
  value: 100,
}

const Default6Digits = NumberStatusTemplate.bind({})
Default6Digits.args = {
  title: 'Default-6',
  value: 334455,
}

const Default10Digits = NumberStatusTemplate.bind({})
Default10Digits.args = {
  title: 'Default-10',
  value: 334455667788,
}

const Small = NumberStatusTemplate.bind({})
Small.args = {
  size: 'small',
  title: 'Small',
  value: 100,
}

const Small6Digits = NumberStatusTemplate.bind({})
Small6Digits.args = {
  size: 'small',
  title: 'Small-6',
  value: 334455,
}

const Small10Digits = NumberStatusTemplate.bind({})
Small10Digits.args = {
  size: 'small',
  title: 'Small-10',
  value: 334455667788,
}

const Large = NumberStatusTemplate.bind({})
Large.args = {
  size: 'large',
  title: 'Large',
  value: 100,
}

const Large6Digits = NumberStatusTemplate.bind({})
Large6Digits.args = {
  size: 'large',
  title: 'Large-6',
  value: 334455,
}

const Large10Digits = NumberStatusTemplate.bind({})
Large10Digits.args = {
  size: 'large',
  title: 'Large-10',
  value: 334455667788,
}

export {
  Default,
  Default6Digits,
  Default10Digits,
  Large,
  Large6Digits,
  Large10Digits,
  Small,
  Small6Digits,
  Small10Digits,
}

export default StorybookEntry
