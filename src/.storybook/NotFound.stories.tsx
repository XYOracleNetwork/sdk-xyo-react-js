import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authServiceList } from './authHelpers'
import { NotFound } from '../../packages/shared/src/components/NotFound'

const StorybookEntry = {
  argTypes: {},
  component: NotFound,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'NotFound',
} as ComponentMeta<typeof NotFound>

const Template: ComponentStory<typeof NotFound> = () => {
  return <NotFound />
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList: [authServiceList[0]],
  },
}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
