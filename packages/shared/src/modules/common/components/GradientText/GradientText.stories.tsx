import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { GradientTextExample } from './GradientText'
const StorybookEntry = {
  argTypes: {},
  component: GradientTextExample,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Common/GradientText',
} as ComponentMeta<typeof GradientTextExample>

const Template: ComponentStory<typeof GradientTextExample> = (args) => (
  <BrowserRouter>
    <GradientTextExample {...args}></GradientTextExample>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
