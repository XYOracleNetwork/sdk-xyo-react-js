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
  <Container maxWidth="xl">
    <Footer {...args}></Footer>
  </Container>
)

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
