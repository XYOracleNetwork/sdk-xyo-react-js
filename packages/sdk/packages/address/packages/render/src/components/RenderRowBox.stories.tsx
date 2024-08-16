import type { Meta, StoryFn } from '@storybook/react'
import type { Address } from '@xylabs/hex'
import { toHex } from '@xylabs/hex'
import { useEvent } from '@xyo-network/react-event'
import { randomBytes } from 'ethers'
import React, { useState } from 'react'

import type { FavoriteItemEvent } from './lib/index.ts'
import { AddressRenderRowBox } from './RenderRowBox.tsx'

const address: Address = toHex(randomBytes(20))

const StorybookEntry = {
  argTypes: {},
  component: AddressRenderRowBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'address/render/AddressRenderRowBox',
} as Meta<typeof AddressRenderRowBox>

const Template: StoryFn<typeof AddressRenderRowBox> = (args) => {
  const [ref] = useEvent<HTMLLIElement>((noun, verb, data) => {
    console.log(`${noun}|${verb}|${data}`)
    const parsedEvent = JSON.parse(data ?? '') as FavoriteItemEvent
    if (parsedEvent.favorite) {
      setName(parsedEvent.name)
    } else {
      setName(undefined)
    }
  })
  const [name, setName] = useState(args.name)
  return <AddressRenderRowBox {...args} name={name} ref={ref} />
}

const Default = Template.bind({})
Default.args = {}

const WithAddress = Template.bind({})
WithAddress.args = {
  address,
}

const WithIcon = Template.bind({})
WithIcon.args = {
  address,
  icons: true,
}

const WithIconOnly = Template.bind({})
WithIconOnly.args = {
  address,
  iconOnly: true,
  icons: true,
}

const WithFavorite = Template.bind({})
WithFavorite.args = {
  address,
  favorite: true,
  icons: true,
  showFavorite: true,
}

const WithFavoriteAlias = Template.bind({})
WithFavoriteAlias.args = {
  address,
  favorite: true,
  icons: true,
  name: 'My Name',
  showFavorite: true,
}

const WithChildren = Template.bind({})
WithChildren.args = {
  address,
  children: <span>[InsertedChild]</span>,
  favorite: true,
  icons: true,
  showFavorite: true,
}

export { Default, WithAddress, WithChildren, WithFavorite, WithFavoriteAlias, WithIcon, WithIconOnly }

export default StorybookEntry
