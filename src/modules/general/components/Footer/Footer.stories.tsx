import { Container } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Footer } from './Footer'

const StorybookEntry = {
  argTypes: {},
  component: Footer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Footer',
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => (
  <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', justifyContent: 'end', minHeight: '100vh' }}>
    <Footer {...args}></Footer>
  </Container>
)

const Default = Template.bind({})
Default.args = {}

const DynamicHeight = Template.bind({})
DynamicHeight.args = { dynamicHeight: true }

export { Default, DynamicHeight }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
