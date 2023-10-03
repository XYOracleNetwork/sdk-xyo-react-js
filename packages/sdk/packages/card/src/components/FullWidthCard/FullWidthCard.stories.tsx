import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { FullWidthCard } from './FullWidthCard'
const StorybookEntry = {
  argTypes: {},
  component: FullWidthCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/FullWidthCard',
} as Meta<typeof FullWidthCard>

const Template: StoryFn<typeof FullWidthCard> = (args) => (
  <BrowserRouter>
    <FullWidthCard {...args}></FullWidthCard>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  cardIsButton: true,
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  name: 'Big Title Here',

  to: '/link',
}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
