import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import type { PoweredByXyoButtonProps } from '../PoweredByXyoButton.tsx'
import { PoweredByXyoButton } from '../PoweredByXyoButton.tsx'

const StorybookEntry = {
  component: PoweredByXyoButton,
  parameters: { docs: { page: null } },
  title: 'Badge/PoweredByXyoButton',
} as Meta<typeof PoweredByXyoButton>

const TemplateContainer: StoryFn<typeof PoweredByXyoButton> = (props: PoweredByXyoButtonProps) => <PoweredByXyoButton {...props} />

const Default = TemplateContainer.bind({})
const Busy = TemplateContainer.bind({})
Busy.args = { busy: true }

export { Busy, Default }

export default StorybookEntry
