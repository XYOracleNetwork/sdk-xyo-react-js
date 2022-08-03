import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { TokenBar } from './TokenBar'
const StorybookEntry = {
  argTypes: {},
  component: TokenBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/TokenBar',
} as ComponentMeta<typeof TokenBar>

const Template: ComponentStory<typeof TokenBar> = (args) => (
  <BrowserRouter>
    <TokenBar {...args}></TokenBar>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = { text1: 'Hello', text2: 'World' }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export { WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
