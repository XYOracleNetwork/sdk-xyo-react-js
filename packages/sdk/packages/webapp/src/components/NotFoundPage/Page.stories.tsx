import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NotFound } from './NotFound'

const StorybookEntry = {
  argTypes: {},
  component: NotFound,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'webapp/NotFound',
} as ComponentMeta<typeof NotFound>

const Template: ComponentStory<typeof NotFound> = () => {
  return <NotFound />
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
