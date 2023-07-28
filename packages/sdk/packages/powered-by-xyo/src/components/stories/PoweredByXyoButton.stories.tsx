import { Meta, StoryFn } from '@storybook/react'

import { PoweredByXyoButton, PoweredByXyoButtonProps } from '../PoweredByXyoButton'

const StorybookEntry = {
  component: PoweredByXyoButton,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Badge/PoweredByXyoButton',
} as Meta<typeof PoweredByXyoButton>

const TemplateContainer: StoryFn<typeof PoweredByXyoButton> = (props: PoweredByXyoButtonProps) => <PoweredByXyoButton {...props} />

const Default = TemplateContainer.bind({})
const Busy = TemplateContainer.bind({})
Busy.args = { busy: true }

export { Busy, Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
