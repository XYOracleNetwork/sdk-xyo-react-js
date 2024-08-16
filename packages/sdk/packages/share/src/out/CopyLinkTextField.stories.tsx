import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { CopyLinkTextField } from './CopyLinkTextField.tsx'

export default {
  title: 'modules/ShareOut/CopyLinkTextField',
} as Meta<typeof CopyLinkTextField>

const Template: StoryFn<typeof CopyLinkTextField> = (props) => {
  return <CopyLinkTextField {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithShareUrl = Template.bind({})
WithShareUrl.args = {
  shareUrl: 'https://google.com',
}

export { Default, WithShareUrl }
