import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ArchivistApiProvider } from '../../contexts'
import { ApiHistory } from './ApiHistory'

const StorybookEntry = {
  argTypes: {
    authServiceList: [],
  },
  component: ApiHistory,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'ApiHistory/ApiHistory',
} as ComponentMeta<typeof ApiHistory>

const Template: ComponentStory<typeof ApiHistory> = ({ ...props }) => {
  return (
    <ArchivistApiProvider apiDomain="http://localhost:8080">
      <ApiHistory {...props} />
    </ArchivistApiProvider>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
