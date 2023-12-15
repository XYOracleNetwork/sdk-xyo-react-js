import { Meta, StoryFn } from '@storybook/react'

import { ManifestNodeProvider } from '@xyo-network/react-manifest'
import { TestSentinel, UseIndexedResults } from './components'
import { ContractWitnessManifestNode, TokenDivinerIndexManifestNode, TokenManifestNode } from './nodes'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/indexed-results/contract-witness',
} as Meta

const Template: StoryFn = (args) => {
  return (
    <ManifestNodeProvider {...args}>
      <TestSentinel />
    </ManifestNodeProvider>
  )
}

const TemplateUseIndexedResults: StoryFn = (args) => {
  return (
    <ManifestNodeProvider {...args}>
      <TestSentinel>
        {(props) => <UseIndexedResults {...props} />}
      </TestSentinel>
    </ManifestNodeProvider>
  )
}

const Default = Template.bind({})
Default.args = {
  manifestNodes: [TokenManifestNode, ContractWitnessManifestNode, TokenDivinerIndexManifestNode]
}

const WithUseIndexedResults = TemplateUseIndexedResults.bind({})
WithUseIndexedResults.args = {
  manifestNodes: [TokenManifestNode, ContractWitnessManifestNode, TokenDivinerIndexManifestNode]
}

export { Default, WithUseIndexedResults }

