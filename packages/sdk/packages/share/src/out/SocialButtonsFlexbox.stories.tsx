import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { SocialButtonsFlexbox } from './SocialButtonsFlexbox.tsx'

export default {
  title: 'modules/ShareOut/SocialButtonsFlexbox',
} as Meta<typeof SocialButtonsFlexbox>

const Template: StoryFn<typeof SocialButtonsFlexbox> = (props) => {
  return <SocialButtonsFlexbox {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithShareUrl = Template.bind({})
WithShareUrl.args = {
  shareUrl: 'https://google.com',
}

export { Default, WithShareUrl }
