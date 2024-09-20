import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { SocialButtonsFlexbox } from './SocialButtonsFlexbox.tsx'

export default { title: 'modules/ShareOut/SocialButtonsFlexbox' } as Meta<typeof SocialButtonsFlexbox>

const Template: StoryFn<typeof SocialButtonsFlexbox> = (props) => {
  return <SocialButtonsFlexbox {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithShareUrl = Template.bind({})
WithShareUrl.args = { shareUrl: 'https://google.com' }

const WithUploadPayloads = Template.bind({})
WithUploadPayloads.args = {
  shareUrl: 'https://google.com',
  uploadPayloads: () => new Promise((resolve) => {
    setTimeout(() => {
      alert('uploaded payloads')
      resolve()
    }, 1000)
  }),
}

const WithUploadPayloadsError = Template.bind({})
WithUploadPayloadsError.args = {
  shareUrl: 'https://google.com',
  uploadPayloads: () => new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Error uploading payloads'))
    }, 1000)
  }),
}

export {
  Default, WithShareUrl, WithUploadPayloads, WithUploadPayloadsError,
}
