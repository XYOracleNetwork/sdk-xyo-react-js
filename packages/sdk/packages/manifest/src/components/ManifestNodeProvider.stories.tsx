import { Meta, StoryFn } from '@storybook/react'
import { ArchivistManifestNode, SentinelManifestNode } from '../story'
import { ManifestNodeProvider } from './ManifestNodeProvider'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/manifest-node/provider',
  component: ManifestNodeProvider 
} as Meta

const Template: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return <ManifestNodeProvider {...args} />
}

const Default = Template.bind({})

const WithArchivist = Template.bind({})
WithArchivist.args = {
  manifestNodes: [ArchivistManifestNode]
}

const WithSentinel = Template.bind({})
WithSentinel.args = {
  manifestNodes: [SentinelManifestNode]
}

const WithArchivistAndSentinel = Template.bind({})
WithArchivistAndSentinel.args = {
  manifestNodes: [ArchivistManifestNode, SentinelManifestNode]
}

export { Default, WithArchivist, WithArchivistAndSentinel, WithSentinel }

