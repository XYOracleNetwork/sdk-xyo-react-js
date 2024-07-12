import { Divider, Typography } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { BrowserRouter } from 'react-router-dom'

import { useGradientStyles } from './GradientStyles.js'

const GradientTextExample: React.FC<FlexBoxProps> = (props) => {
  const { classes } = useGradientStyles()
  const classNames = classes()
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Typography variant="h4" gutterBottom>
        XYO Network Gradient Text Options
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Highlight
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Typography variant="h5" gutterBottom>
        Lorem ipsum dolor sit amet consectetur, <span className={classNames.heading}>adipisicing elit.</span>
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Body Text
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Typography variant="h5" gutterBottom className={classNames.heading}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perspiciatis aliquam consequuntur nisi alias impedit ducimus ipsa voluptas,
        suscipit ea vel dicta quasi hic, deserunt tempore, natus optio veritatis dolor?
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Caption
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Typography variant="caption" gutterBottom className={classNames.heading}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perspiciatis aliquam consequuntur nisi alias impedit ducimus ipsa voluptas,
        suscipit ea vel dicta quasi hic, deserunt tempore, natus optio veritatis dolor?
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Card Border
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
    </FlexCol>
  )
}

const StorybookEntry = {
  argTypes: {},
  component: GradientTextExample,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/GradientText',
} as Meta<typeof GradientTextExample>

const Template: StoryFn<typeof GradientTextExample> = (args) => (
  <BrowserRouter>
    <GradientTextExample {...args}></GradientTextExample>
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {}

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
