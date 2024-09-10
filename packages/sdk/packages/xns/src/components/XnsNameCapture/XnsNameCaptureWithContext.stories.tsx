import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react'
import React from 'react'
import type { To } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import { XnsNameCaptureWithContext } from './XnsNameCaptureWithContext.tsx'

export default { title: 'modules/xns/XnsNameCaptureWithContext' } as Meta

const testableParams = ['signature', 'username'] as const
type RouteDecorator = (params: [typeof testableParams[number], string][]) => Decorator

// eslint-disable-next-line react/display-name
const RouteDecorator: RouteDecorator = params => (Story, args) => {
  // Get the URL object
  const url = new URL(window.location.href)

  // Remove all stale testable params from the URL
  for (const param of testableParams) url.searchParams.delete(param)
  window.history.replaceState({}, '', url)

  // Add the new testable params to the URL
  for (const [param, value] of params) url.searchParams.set(param, value)

  // Replace the URL without reloading
  window.history.replaceState({}, '', url)

  return <Story {...args} />
}

const Template: StoryFn<typeof XnsNameCaptureWithContext> = (args) => {
  return (
    <BrowserRouter>
      <XnsNameCaptureWithContext {...args}></XnsNameCaptureWithContext>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.decorators = [RouteDecorator([['signature', '0x1234567890abcdef']])]
Default.args = {}

const WithOnCaptureName = Template.bind({})
WithOnCaptureName.decorators = [RouteDecorator([['signature', '0x1234567890abcdef']])]
WithOnCaptureName.args = { navigate: (to: To) => alert(`navigated to: ${to}`), onCaptureName: (name: string) => Promise.resolve(alert(`Buy Name: ${name}`)) }

const WithBadXnsNameInRoute = Template.bind({})
WithBadXnsNameInRoute.decorators = [RouteDecorator([['signature', '0x1234567890abcdef'], ['username', 'badname.xyo.xyo']])]
WithBadXnsNameInRoute.args = {
  navigate: (to: To) => alert(`navigated to: ${to}`),
  onCaptureName: (name: string) => Promise.resolve(alert(`Buy Name: ${name}`)),
}

const WithUserName = Template.bind({})
WithUserName.decorators = [RouteDecorator([['username', 'foobar']])]
WithUserName.args = { navigate: (to: To) => alert(`navigated to: ${to}`) }

export {
  Default, WithBadXnsNameInRoute, WithOnCaptureName, WithUserName,
}
