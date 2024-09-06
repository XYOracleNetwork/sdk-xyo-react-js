import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import type { To } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import { XnsNameCaptureWithContext } from './XnsNameCaptureWithContext.tsx'

export default { title: 'modules/xns/XnsNameCaptureWithContext' } as Meta

const Template: StoryFn<typeof XnsNameCaptureWithContext> = (args) => {
  // Get the current URL
  const url = new URL(window.location.href)

  // Update or add the URL parameter
  url.searchParams.set('signature', '0x1234567890abcdef')

  // Update the URL without reloading the page
  window.history.replaceState({}, '', url)
  return (
    <BrowserRouter>
      <XnsNameCaptureWithContext {...args}></XnsNameCaptureWithContext>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithOnBuyName = Template.bind({})
WithOnBuyName.args = { navigate: (to: To) => alert(`navigated to: ${to}`), onCaptureName: (name: string) => Promise.resolve(alert(`Buy Name: ${name}`)) }

export { Default, WithOnBuyName }
