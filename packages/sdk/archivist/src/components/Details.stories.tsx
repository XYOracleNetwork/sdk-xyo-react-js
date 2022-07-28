import { ComponentMeta, ComponentStory } from '@storybook/react'
import { forget } from '@xylabs/sdk-js'
import { XyoMemoryArchivist } from '@xyo-network/archivist'
import { useAppThemeDecorator } from '@xyo-network/react-storybook'

import { ArchivistDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: ArchivistDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archivist/Details',
} as ComponentMeta<typeof ArchivistDetails>

const Template: ComponentStory<typeof ArchivistDetails> = (args) => <ArchivistDetails {...args}></ArchivistDetails>

const archivist = new XyoMemoryArchivist()
const initArchivist = async () => {
  await archivist.insert?.([{ schema: 'network.xyo.test' }])
}
forget(initArchivist())

const Default = Template.bind({})
Default.args = {}
Default.decorators = [useAppThemeDecorator]

const WithData = Template.bind({})
WithData.args = { archivist }
WithData.decorators = [useAppThemeDecorator]

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
