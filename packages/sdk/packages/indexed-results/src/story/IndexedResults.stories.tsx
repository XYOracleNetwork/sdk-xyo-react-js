import { Meta, StoryFn } from '@storybook/react'

import { ArchivistManifestNode, ManifestNodeProvider, SentinelManifestNode } from '.'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/indexed-results-testing',
} as Meta

const Template: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return < ManifestNodeProvider {...args} />
}

const TemplateForIndexedResults: StoryFn<typeof  ManifestNodeProvider> = (args) => {
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

const WithArchivistAndSentinel = TemplateForIndexedResults.bind({})
WithArchivistAndSentinel.args = {
  manifestNodes: [ArchivistManifestNode, SentinelManifestNode]
}

export { Default, WithArchivist, WithArchivistAndSentinel, WithSentinel }
