import type { Meta, StoryFn } from '@storybook/react-vite'
import { delay } from '@xylabs/delay'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import type { Hash } from '@xylabs/sdk-js'
import { asArchivistInstance } from '@xyo-network/archivist-model'
import type { PackageManifestPayload } from '@xyo-network/manifest'
import { ManifestWrapper } from '@xyo-network/manifest'
import { ModuleFactoryLocator } from '@xyo-network/module-factory-locator'
import type { NodeInstance } from '@xyo-network/node-model'
import { NodeProvider } from '@xyo-network/react-node'
import { HDWallet } from '@xyo-network/wallet'
import React, { useState } from 'react'

import type { PoweredByXyoProps } from '../PoweredByXyo.tsx'
import { PoweredByXyo } from '../PoweredByXyo.tsx'
import { simpleNodeInlineManifest } from './manifest.ts'

const StorybookEntry = {
  component: PoweredByXyo,
  parameters: { docs: { page: null } },
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
    async () => {
      const wallet = await HDWallet.random()
      const manifest = new ManifestWrapper(simpleNodeInlineManifest as unknown as PackageManifestPayload, wallet, new ModuleFactoryLocator())
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
          await archivist.get(['' as Hash])
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

export {
  Busy, Default, WithNode, WithNodeAndDebug,
}

export default StorybookEntry
