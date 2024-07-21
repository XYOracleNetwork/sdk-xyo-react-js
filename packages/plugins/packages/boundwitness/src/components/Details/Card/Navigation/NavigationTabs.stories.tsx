import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { BWNavigationTabs } from './NavigationTabs.js'

// eslint-disable-next-line import/no-default-export
export default {
  component: BWNavigationTabs,
  parameters: {
    actions: {
      argTypesRegex: '(?!^onChange)^on[A-Z].*',
    },
  },
  title: 'plugin/boundwitness/BWNavigationTabs',
} as Meta

const Template: StoryFn<typeof BWNavigationTabs> = (props) => {
  const [value, setValue] = useState(0)

  return (
    <FlexCol alignItems="start">
      <BWNavigationTabs value={value} setValue={setValue} {...props} />
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }
