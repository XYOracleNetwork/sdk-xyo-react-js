import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import type { XyoBusyProps } from '../XyoBusy.tsx'
import { XyoBusy } from '../XyoBusy.tsx'

const StorybookEntry = {
  component: XyoBusy,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Badge/XyoBusy',
} as Meta<typeof XyoBusy>

const TemplateContainer: StoryFn<typeof XyoBusy> = (props: XyoBusyProps) => <XyoBusy {...props} />

const Default = TemplateContainer.bind({})
const Busy = TemplateContainer.bind({})
Busy.args = { busy: true }

export { Busy, Default }

export default StorybookEntry
