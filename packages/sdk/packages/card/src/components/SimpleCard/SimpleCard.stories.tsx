import { Grid } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import CoinbaseWalletIcon from './coinbase-wallet.svg'
import MoneyMedia from './money.jpg'
import { SimpleCard } from './SimpleCard.js'
const StorybookEntry = {
  argTypes: {},
  component: SimpleCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/SimpleCard',
} as Meta<typeof SimpleCard>

const Template: StoryFn<typeof SimpleCard> = args => (
  <BrowserRouter>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SimpleCard {...args}></SimpleCard>
      </Grid>
    </Grid>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
  subtitle: 'Aug 25, 1997',
}
const DefaultWithImage = Template.bind({})
DefaultWithImage.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
  iconImage: CoinbaseWalletIcon,
  subtitle: 'Aug 25, 1997',
}
const VariantButton = Template.bind({})
VariantButton.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
  interactionVariant: 'button',
  subtitle: 'Aug 25, 1997',
}
const DefaultSmallCard = Template.bind({})
DefaultSmallCard.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis!',
  headline: 'Headline Lorem Ipsum',
  small: true,
  subtitle: 'Aug 25, 1997',
}
const DefaultMediaCard = Template.bind({})
DefaultMediaCard.args = {
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat delectus nemo optio quis! Totam magni laboriosam repudiandae nam nobis at quisquam aut omnis, quis officiis similique enim id dolorem unde!',
  headline: 'Headline Lorem Ipsum',
  media: MoneyMedia,
  subtitle: 'Aug 25, 1997',
}
const CardWithAllParameters = Template.bind({})
CardWithAllParameters.args = {
  desc: 'Many people believe that a card cannot be a button. But here at XYO, we say "No way, José" and turn our cards into buttons.',
  headline: 'Did you know that this card is complex?',
  iconImage: CoinbaseWalletIcon,
  interactionVariant: 'button',
  media: MoneyMedia,
  subtitle: 'Aug 25, 1997',
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export { CardWithAllParameters, Default, DefaultMediaCard, DefaultSmallCard, DefaultWithImage, VariantButton }

export default StorybookEntry
