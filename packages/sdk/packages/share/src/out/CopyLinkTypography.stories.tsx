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

const WithXnsName = Template.bind({})
WithXnsName.args = { shareUrl: 'https://beta.node.xyo.network.com/view/arietrouw.xyo/profile', xnsName: 'arietrouw.xyo' }

const WithXnsNameInSubdomain = Template.bind({})
WithXnsNameInSubdomain.args = { shareUrl: 'https://arietrouw.xyo.network', xnsName: 'arietrouw.xyo' }

const WithError = Template.bind({})
WithError.args = { shareUrl: 'https://google.com', xnsName: 'foo.xyo' }

export {
  Default, WithError,
  WithShareUrl, WithXnsName, WithXnsNameInSubdomain,
}
