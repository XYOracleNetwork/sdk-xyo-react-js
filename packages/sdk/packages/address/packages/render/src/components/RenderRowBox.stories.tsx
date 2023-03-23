import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Account } from '@xyo-network/account'
import { useXyoEvent } from '@xyo-network/react-event'
import { useState } from 'react'

import { FavoriteItemEvent } from './lib'
import { AddressRenderRowBox } from './RenderRowBox'

const address = new Account({ phrase: 'temp' }).addressValue.hex

const StorybookEntry = {
  argTypes: {},
  component: AddressRenderRowBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'address/render/AddressRenderRowBox',
} as ComponentMeta<typeof AddressRenderRowBox>

const Template: ComponentStory<typeof AddressRenderRowBox> = (args) => {
  const [ref] = useXyoEvent<HTMLLIElement>((noun, verb, data) => {
    console.log(`${noun}|${verb}|${data}`)
    const parsedEvent = JSON.parse(data ?? '') as FavoriteItemEvent
    if (parsedEvent.favorite) {
      setAlias(parsedEvent.alias)
    } else {
      setAlias(undefined)
    }
  })
  const [alias, setAlias] = useState(args.alias)
  return <AddressRenderRowBox {...args} alias={alias} ref={ref} />
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
  alias: 'My Alias',
  favorite: true,
  icons: true,
  showFavorite: true,
}

const WithChildren = Template.bind({})
WithChildren.args = {
  address,
  children: <span>{'[InsertedChild]'}</span>,
  favorite: true,
  icons: true,
  showFavorite: true,
}

export { Default, WithAddress, WithChildren, WithFavorite, WithFavoriteAlias, WithIcon, WithIconOnly }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
