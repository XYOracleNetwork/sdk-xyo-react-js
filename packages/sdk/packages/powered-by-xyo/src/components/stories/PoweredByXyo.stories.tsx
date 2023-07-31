import { Meta, StoryFn } from '@storybook/react'
import { delay } from '@xylabs/delay'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { HDWallet } from '@xyo-network/account'
import { asArchivistInstance } from '@xyo-network/archivist-model'
import { ManifestPayload, ManifestWrapper } from '@xyo-network/manifest'
import { NodeInstance } from '@xyo-network/node'
import { NodeProvider } from '@xyo-network/react-node'
import { useState } from 'react'

import { PoweredByXyo, PoweredByXyoProps } from '../PoweredByXyo'
import simpleNodeInlineManifest from './simple-node-inline-manifest.json'

const StorybookEntry = {
  component: PoweredByXyo,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Badge/PoweredByXyo',
} as Meta<typeof PoweredByXyo>

const TemplateContainer: StoryFn<typeof PoweredByXyo> = (props: PoweredByXyoProps) => (
  <FlexCol height="300px" width="100%" sx={{ backgroundColor: 'grey' }}>
    <PoweredByXyo {...props} />
  </FlexCol>
)

const TemplateWithNodeContainer: StoryFn<typeof PoweredByXyo> = (props: PoweredByXyoProps) => {
  const [node, setNode] = useState<NodeInstance>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const wallet = await HDWallet.random()
      const manifest = new ManifestWrapper(simpleNodeInlineManifest as ManifestPayload, wallet)
      const [node] = await manifest.loadNodes()
      setNode(node)
    },
    [],
  )

  usePromise(async () => {
    if (node) {
      const archivist = asArchivistInstance(await node.resolve('Archivist'))
      if (archivist) {
        let calls = 1
        while (calls) {
          calls--
          await archivist.get([''])
          await delay(100)
        }
      }
    }
  }, [node])

  return (
    <NodeProvider node={node}>
      <FlexCol height="300px" width="100%" sx={{ backgroundColor: 'grey' }}>
        <PoweredByXyo node={node} {...props} />
      </FlexCol>
    </NodeProvider>
  )
}

const Default = TemplateContainer.bind({})

const Busy = TemplateContainer.bind({})
Busy.args = { busy: true }

const WithNode = TemplateWithNodeContainer.bind({})

const WithNodeAndDebug = TemplateWithNodeContainer.bind({})
WithNodeAndDebug.args = { debugDialog: true }

export { Busy, Default, WithNode, WithNodeAndDebug }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
