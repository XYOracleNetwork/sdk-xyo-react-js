import { Meta, StoryFn } from '@storybook/react'
import React, { useState } from 'react'

import { ConnectedAccountsFlexbox } from './ConnectedAccountsFlexbox.tsx'

const StorybookEntry: Meta = {
  argTypes: {},
  component: ConnectedAccountsFlexbox,
  parameters: {
    actions: { argTypesRegex: '!(^on.*)' },
    docs: {
      page: null,
    },
  },
  title: 'connectedAccounts/Flexbox',
}

const Template: StoryFn<typeof ConnectedAccountsFlexbox> = (props) => {
  return <ConnectedAccountsFlexbox {...props} />
}

const TemplateWithIgnoreDialog: StoryFn<typeof ConnectedAccountsFlexbox> = (props) => {
  const [ignoreDialog, setIgnoreDialog] = useState(false)
  const listener = (checked: boolean) => setIgnoreDialog(checked)

  return <ConnectedAccountsFlexbox ignoreConnectDialog={ignoreDialog} onIgnoreConnectDialog={listener} {...props} />
}

const Default = Template.bind({})
const WithIgnoreDialog = TemplateWithIgnoreDialog.bind({})

export { Default, WithIgnoreDialog }

export default StorybookEntry
