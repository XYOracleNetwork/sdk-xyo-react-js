import { Meta, StoryFn } from '@storybook/react'
import { usePromise } from '@xylabs/react-promise'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import { BoundWitnessBuilder } from '@xyo-network/boundwitness-builder'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { AbstractDiviner } from '@xyo-network/diviner'
import { MemoryArchivist } from '@xyo-network/memory-archivist'
import { Payload } from '@xyo-network/payload-model'
import { TimestampSchema } from '@xyo-network/witness-timestamp'
import { useEffect } from 'react'
import { ArchivistManifestNode, ManifestNodeProvider, SentinelManifestNode } from '.'

// Major WIP

const buildPayloads= () => ([
  {
    schema: TimestampSchema,
    timestamp: Date.now(),
  },
  // the indexedPayload
  {
    foo: 'bar',
    schema: 'network.xyo.test'
  }
])

const buildBW = async (): Promise<{ bw: BoundWitness; payloads: Payload[]}> => {
  const bwBuilder = new BoundWitnessBuilder().payloads(buildPayloads())
  const [bw, payloads] = await bwBuilder.build()
  return { bw, payloads }
}

export class MockIndexedDiviner extends AbstractDiviner {
  static override get configSchema() { return 'network.xyo.test.indexed.diviner' }

  // a mock private archivist that only the diviner can access internally
  archivist: ArchivistInstance | undefined

  async divineHandler() {
    return await this.archivist?.all?.() ?? []
  }
}

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/indexed-results-testing',
} as Meta

const Template: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  return < ManifestNodeProvider {...args} />
}

const TemplateForIndexedResults: StoryFn<typeof  ManifestNodeProvider> = (args) => {
  const [indexedArchivist] = usePromise(async () => await MemoryArchivist.create(), [])
  const [indexedDiviner] = usePromise(async () => {
    if (indexedArchivist) {
      const diviner = await MockIndexedDiviner.create()
      diviner.archivist = indexedArchivist
      return diviner
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      const { bw, payloads } = await buildBW()
      await indexedArchivist?.insert([bw])
    }, 1000)

    return () => clearInterval(interval)
  })

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
