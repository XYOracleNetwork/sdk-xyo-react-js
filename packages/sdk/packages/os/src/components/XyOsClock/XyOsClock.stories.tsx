import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { FlexGrowCol } from '@xylabs/react-flexbox'
import { XyOsClock } from './XyOsClock'
import { Box, Typography } from '@mui/material'
const StorybookEntry = {
  argTypes: {},
  component: XyOsClock,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/XyOsClock',
} as Meta<typeof XyOsClock>

const Template: StoryFn<typeof XyOsClock> = (args) => (
  <BrowserRouter>
    <FlexGrowCol gap={2}  alignItems={'center'} justifyContent={'center'}>
      <FlexGrowCol alignItems={'center'} justifyContent={'center'}>
        <XyOsClock  {...args}></XyOsClock>
      </FlexGrowCol>
    </FlexGrowCol>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  clockType:'appbar'
}



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
