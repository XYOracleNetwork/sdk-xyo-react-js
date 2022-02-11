import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StyleGuide } from './StyleGuide'

const StorybookEntry = {
  argTypes: {},
  component: StyleGuide,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'UI/StyleGuild',
} as ComponentMeta<typeof StyleGuide>

const Template: ComponentStory<typeof StyleGuide> = () => <StyleGuide />

const Default = Template.bind({})
Default.args = {}
Default.decorators = []

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
