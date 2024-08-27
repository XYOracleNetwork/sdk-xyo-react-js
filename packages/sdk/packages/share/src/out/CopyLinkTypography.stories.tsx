import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { CopyLinkTypography } from './CopyLinkTypography.tsx'

export default { title: 'modules/ShareOut/CopyLinkTypography' } as Meta<typeof CopyLinkTypography>

const Template: StoryFn<typeof CopyLinkTypography> = (props) => {
  return <CopyLinkTypography {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithShareUrl = Template.bind({})
WithShareUrl.args = { shareUrl: 'https://google.com' }

export { Default, WithShareUrl }
