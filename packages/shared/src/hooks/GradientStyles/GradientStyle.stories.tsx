import { Divider, Grid, Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'

import { SimpleCard } from '../../components'
import { useGradientStyles } from './GradientStyles'

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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perspiciatis aliquam consequuntur nisi alias impedit ducimus ipsa voluptas, suscipit ea vel dicta quasi hic,
        deserunt tempore, natus optio veritatis dolor?
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Caption
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Typography variant="caption" gutterBottom className={classNames.heading}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perspiciatis aliquam consequuntur nisi alias impedit ducimus ipsa voluptas, suscipit ea vel dicta quasi hic,
        deserunt tempore, natus optio veritatis dolor?
      </Typography>
      <Typography variant="subtitle2" gutterBottom paddingTop={3}>
        Card Border
      </Typography>
      <Divider sx={{ marginY: '8px' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <SimpleCard
            gradient="border"
            headline="Gradient Border Simple Card"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus! Cum id quo eligendi dolor expedita."
            interactionVariant="button"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SimpleCard
            gradient="background"
            headline="Gradient Background Simple Card"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus! Cum id quo eligendi dolor expedita."
            interactionVariant="button"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SimpleCard
            gradient="border"
            headline="Gradient Border Simple Card"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus! Cum id quo eligendi dolor expedita."
            interactionVariant="button"
          />
        </Grid>
      </Grid>
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
} as ComponentMeta<typeof GradientTextExample>

const Template: ComponentStory<typeof GradientTextExample> = (args) => (
  <BrowserRouter>
    <GradientTextExample {...args}></GradientTextExample>
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {}

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
