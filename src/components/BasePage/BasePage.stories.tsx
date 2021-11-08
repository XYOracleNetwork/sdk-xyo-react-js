import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import BasePage from './BasePage'

const StorybookEntry = {
  argTypes: {},
  component: BasePage,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'BasePage',
} as ComponentMeta<typeof BasePage>

const Template: ComponentStory<typeof BasePage> = (args) => (
  <BrowserRouter>
    <BasePage {...args}></BasePage>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  title: 'Default',
}

export { Default }

export default StorybookEntry
