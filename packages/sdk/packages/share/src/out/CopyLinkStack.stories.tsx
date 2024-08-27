import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { CopyLinkStack } from './CopyLinkStack.tsx'

export default { title: 'modules/ShareOut/CopyLinkStack' } as Meta<typeof CopyLinkStack>

const Template: StoryFn<typeof CopyLinkStack> = (props) => {
  return <CopyLinkStack {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithShareUrl = Template.bind({})
WithShareUrl.args = { shareUrl: 'https://google.com' }

const WithXnsName = Template.bind({})
WithXnsName.args = { shareUrl: 'https://beta.node.xyo.network.com/view/arietrouw.xyo/profile', xnsName: 'arietrouw.xyo' }

const WithXnsNameShortened = Template.bind({})
WithXnsNameShortened.args = {
  shareUrl: 'https://beta.node.xyo.network.com/view/arietrouw.xyo/profile', xnsName: 'arietrouw.xyo', sx: { maxWidth: '200px' },
}

const WithXnsNameInSubdomain = Template.bind({})
WithXnsNameInSubdomain.args = { shareUrl: 'https://arietrouw.xyo.network', xnsName: 'arietrouw.xyo' }

const WithXnsNameCustomColors = Template.bind({})
WithXnsNameCustomColors.args = {
  shareUrl: 'https://arietrouw.xyo.network', xnsName: 'arietrouw.xyo', xnsStartColor: 'blue', xnsEndColor: 'red',
}

const WithError = Template.bind({})
WithError.args = { shareUrl: 'https://google.com', xnsName: 'foo.xyo' }

export {
  Default, WithError,
  WithShareUrl, WithXnsName, WithXnsNameCustomColors,
  WithXnsNameInSubdomain, WithXnsNameShortened,
}
