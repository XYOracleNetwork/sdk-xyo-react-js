import { Meta, StoryFn } from '@storybook/react'

import { ArchivistManifestNode, ManifestNodeProvider, SentinelManifestNode } from '.'
import { TestSentinel } from './components'
import { ContractWitnessManifestNode, TokenDivinerIndexManifestNode, TokenManifestNode } from './nodes'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/manifest-node/provider',
  component: ManifestNodeProvider 
} as Meta

const Template: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return <ManifestNodeProvider {...args} />
}

const TemplateForContractAndToken: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return <ManifestNodeProvider {...args}>
    <TestSentinel />
  </ManifestNodeProvider>
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

const WithContractAndToken = TemplateForContractAndToken.bind({})
WithContractAndToken.args = {
  manifestNodes: [TokenManifestNode, ContractWitnessManifestNode, TokenDivinerIndexManifestNode]
}

export { Default, WithArchivist, WithArchivistAndSentinel, WithContractAndToken, WithSentinel }

