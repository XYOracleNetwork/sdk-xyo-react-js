import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { XnsCaptureSecondaryLink } from './SecondaryLink.tsx'

export default { title: 'modules/xns/XnsCaptureSecondaryLink' } as Meta

const Template: StoryFn<typeof XnsCaptureSecondaryLink> = (args) => {
  return <XnsCaptureSecondaryLink {...args}></XnsCaptureSecondaryLink>
}

const Default = Template.bind({})
Default.args = {}

const WithOnBuyName = Template.bind({})
WithOnBuyName.args = { xnsName: 'testing123', onCaptureName: (name: string) => Promise.resolve(alert(`Buy Name: ${name}`)) }

export { Default, WithOnBuyName }
