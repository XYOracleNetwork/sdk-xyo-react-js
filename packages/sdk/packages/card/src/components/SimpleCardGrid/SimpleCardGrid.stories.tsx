import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom-6'

import CoinbaseWalletIcon from './coinbase-wallet.svg'
import MoneyMedia from './money.jpg'
import { SimpleCardGrid } from './SimpleCardGrid'
const StorybookEntry = {
  argTypes: {},
  component: SimpleCardGrid,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/SimpleCardGrid',
} as Meta<typeof SimpleCardGrid>

const Template: StoryFn<typeof SimpleCardGrid> = (args) => (
  <BrowserRouter>
    <SimpleCardGrid {...args}></SimpleCardGrid>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  cards: [
    {
      desc: 'Many people believe that a card cannot be a button. But here at XYO, we say "No way, José" and turn our cards into buttons.',
      headline: 'Did you know that this card is complex?',
      iconImage: CoinbaseWalletIcon,
      interactionVariant: 'button',
      media: MoneyMedia,
      subtitle: 'Aug 25, 1997',
    },
    {
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente incidunt, beatae suscipit nam consequuntur, minus facere obcaecati, recusandae totam aspernatur aut debitis. Aspernatur nisi molestiae atque? Nisi eius perspiciatis tempore?',
      headline: 'Did you know that this card is complex?',
      iconImage: CoinbaseWalletIcon,
      interactionVariant: 'button',
      media: MoneyMedia,
      subtitle: 'Aug 25, 1997',
    },
    {
      desc: 'Many people believe that a card cannot be a button. But here at XYO, we say "No way, José" and turn our cards into buttons.Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      headline: 'Did you know that this card is complex?',
      iconImage: CoinbaseWalletIcon,
      interactionVariant: 'button',
      media: MoneyMedia,
      subtitle: 'Aug 25, 1997',
    },
    {
      desc: 'Many people believe that a card cannot be a button. But here at XYO, we say "No way, José" and turn our cards into buttons. Sapiente incidunt, beatae suscipit nam consequuntur, minus facere obcaecati, recusandae totam aspernatur aut debitis. Aspernatur nisi molestiae atque? Nisi eius perspiciatis tempore?',
      headline: 'Did you know that this card is complex?',
      iconImage: CoinbaseWalletIcon,
      interactionVariant: 'button',
      media: MoneyMedia,
      subtitle: 'Aug 25, 1997',
    },
    {
      desc: 'Many people believe that a card cannot be a button. But here at XYO, we say "No way, José" and turn our cards into buttons.',
      headline: 'Did you know that this card is complex?',
      iconImage: CoinbaseWalletIcon,
      interactionVariant: 'button',
      media: MoneyMedia,
      subtitle: 'Aug 25, 1997',
    },
  ],
  spacing: 2,
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
