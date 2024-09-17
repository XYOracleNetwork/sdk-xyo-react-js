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
WithXnsName.args = {
  shareUrl: 'https://beta.node.xyo.network.com/view/arietrouw.xyo/profile', xnsName: 'arietrouw.xyo', addToXnsName: true,
}

const WithNoAddToXnsName = Template.bind({})
WithNoAddToXnsName.args = {
  shareUrl: 'https://beta.node.xyo.network.com/view/somehash1234567/profile', xnsName: 'arietrouw.xyo', addToXnsName: false,
}

const WithXnsNameShortened = Template.bind({})
WithXnsNameShortened.args = {
  shareUrl: 'https://beta.node.xyo.network.com/view/arietrouw.xyo/profile', xnsName: 'arietrouw.xyo', addToXnsName: true, sx: { maxWidth: '200px' },
}

const WithXnsNameInSubdomain = Template.bind({})
WithXnsNameInSubdomain.args = {
  shareUrl: 'https://arietrouw.xyo.network', xnsName: 'arietrouw.xyo', addToXnsName: true,
}

const WithXnsNameCustomColors = Template.bind({})
WithXnsNameCustomColors.args = {
  shareUrl: 'https://arietrouw.xyo.network', xnsName: 'arietrouw.xyo', xnsStartColor: 'blue', xnsEndColor: 'red', addToXnsName: true,
}

const WithError = Template.bind({})
WithError.args = {
  shareUrl: 'https://google.com', xnsName: 'foo.xyo', addToXnsName: true,
}

export {
  Default, WithError,
  WithNoAddToXnsName,
  WithShareUrl, WithXnsName, WithXnsNameCustomColors,
  WithXnsNameInSubdomain, WithXnsNameShortened,
}
