import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { GenerateShareLinkButton } from './GenerateShareLinkButton.tsx'

export default {
  title: 'modules/ShareOut/GenerateShareLinkButton',
} as Meta<typeof GenerateShareLinkButton>

const Template: StoryFn<typeof GenerateShareLinkButton> = (props) => {
  return <GenerateShareLinkButton {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithLoading = Template.bind({})
WithLoading.args = {
  loading: true,
}

export { Default, WithLoading }
