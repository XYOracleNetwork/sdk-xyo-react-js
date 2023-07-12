import { Meta, StoryFn } from '@storybook/react'

import { ShareButton } from './ShareButton'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/ShareButton',
} as Meta<typeof ShareButton>

const Template: StoryFn<typeof ShareButton> = (props) => {
  return <ShareButton {...props} />
}

const Default = Template.bind({})
Default.args = {}
const WithUnPrepared = Template.bind({})
WithUnPrepared.args = { prepared: false }

export { Default, WithUnPrepared }
