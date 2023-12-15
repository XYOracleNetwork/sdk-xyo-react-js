import { Meta, StoryFn } from '@storybook/react'

import { ManifestNodeProvider } from '@xyo-network/react-manifest'
import { TestSentinel } from './components'
import { ContractWitnessManifestNode, TokenDivinerIndexManifestNode, TokenManifestNode } from './nodes'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/indexed-results/contract-witness',
} as Meta

const Template: StoryFn = (args) => {
  return <ManifestNodeProvider {...args} />
}

const TemplateForContractAndToken: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return <ManifestNodeProvider {...args}>
    <TestSentinel />
  </ManifestNodeProvider>
}

const Default = Template.bind({})

const WithContractAndToken = TemplateForContractAndToken.bind({})
WithContractAndToken.args = {
  manifestNodes: [TokenManifestNode, ContractWitnessManifestNode, TokenDivinerIndexManifestNode]
}

export { Default, WithContractAndToken }

