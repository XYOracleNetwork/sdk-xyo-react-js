import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { ShareButton } from './ShareButton.tsx'

export default { title: 'modules/ShareButton' } as Meta<typeof ShareButton>

const Template: StoryFn<typeof ShareButton> = (props) => {
  return <ShareButton {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithUnPrepared = Template.bind({})
WithUnPrepared.args = { prepared: false }

const WithCustomShareLink = Template.bind({})
WithCustomShareLink.args = { shareLink: 'https://explore.xyo.network' }

export {
  Default, WithCustomShareLink, WithUnPrepared,
}
