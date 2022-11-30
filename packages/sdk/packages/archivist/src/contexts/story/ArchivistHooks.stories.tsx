import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useArchivistFind, useArchivistGet } from '../use'
import { ArchivistPayloads } from './ArchivistPayloads.stories'
import { WithArchivistProviders } from './WithArchivistProviders.stories'

const StorybookEntry = {
  argTypes: {},
  component: ArchivistPayloads,
  decorators: [WithArchivistProviders],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archivist/Hooks',
} as ComponentMeta<typeof ArchivistPayloads>

const ArchivistGetPayloadsTemplate: ComponentStory<typeof ArchivistPayloads> = (args) => {
  const [payloads, error, refresh] = useArchivistGet([
    '3da33603417622f4cdad2becbca8c7889623d9045d0e8923e1702a99d2f3e47c',
    '3da33603417622f4cdad2becbca8c7889623d9045d0e8923e1702a99d2f3e47d',
  ])
  return <ArchivistPayloads payloads={payloads} error={error} refresh={refresh} {...args}></ArchivistPayloads>
}

const ArchivistFindPayloadsTemplate: ComponentStory<typeof ArchivistPayloads> = (args) => {
  const [payloads, error, refresh] = useArchivistFind({
    limit: 5,
    schema: 'network.xyo.payload',
  })
  return <ArchivistPayloads payloads={payloads} error={error} refresh={refresh} {...args}></ArchivistPayloads>
}

const Get = ArchivistGetPayloadsTemplate.bind({})
Get.args = {}

const Find = ArchivistFindPayloadsTemplate.bind({})
Find.args = {}

export { Find, Get }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
