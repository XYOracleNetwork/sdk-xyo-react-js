/* eslint-disable import/no-internal-modules */
import { Meta, StoryFn } from '@storybook/react'

import { ConnectedAccountsFlexbox } from './ConnectedAccountsFlexbox'

const StorybookEntry: Meta = {
  argTypes: {},
  component: ConnectedAccountsFlexbox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'connectedAccounts/Flexbox',
}

const Template: StoryFn<typeof ConnectedAccountsFlexbox> = (props) => {
  return <ConnectedAccountsFlexbox {...props} />
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
