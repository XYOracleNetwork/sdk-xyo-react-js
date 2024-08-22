/**
 * More to come...
 */

import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

export default { title: 'modules/form/test' } as Meta

const Template: StoryFn<React.FC> = (args) => {
  return <div {...args}></div>
}

const Default = Template.bind({})
Default.args = {}

export { Default }
