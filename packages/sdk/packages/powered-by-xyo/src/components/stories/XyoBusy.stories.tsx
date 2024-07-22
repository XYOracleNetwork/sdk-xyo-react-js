import { Meta, StoryFn } from '@storybook/react'

import { XyoBusy, XyoBusyProps } from '../XyoBusy.js'

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

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
