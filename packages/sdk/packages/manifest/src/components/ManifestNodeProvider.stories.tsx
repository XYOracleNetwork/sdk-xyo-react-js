import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { ArchivistManifestNode, SentinelManifestNode } from '../stories/index.ts'
import { ManifestNodeProvider } from './ManifestNodeProvider.tsx'

export default {
  component: ManifestNodeProvider,
  title: 'modules/manifest-node/provider',
} as Meta

const Template: StoryFn<typeof ManifestNodeProvider> = (args) => {
  return <ManifestNodeProvider {...args} />
}

const Default = Template.bind({})

const WithArchivist = Template.bind({})
WithArchivist.args = {
  manifestNodes: [ArchivistManifestNode],
}

const WithSentinel = Template.bind({})
WithSentinel.args = {
  manifestNodes: [SentinelManifestNode],
}

const WithArchivistAndSentinel = Template.bind({})
WithArchivistAndSentinel.args = {
  manifestNodes: [ArchivistManifestNode, SentinelManifestNode],
}

export {
  Default, WithArchivist, WithArchivistAndSentinel, WithSentinel,
}
