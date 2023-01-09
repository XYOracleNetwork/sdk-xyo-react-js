/* eslint-disable import/no-internal-modules */
import { TextField, Typography } from '@mui/material'
import { ComponentStory, DecoratorFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { RemoteModuleResolver } from '@xyo-network/http-proxy-module'
import { NodeConfigSchema } from '@xyo-network/node'
import { MemoryNodeProvider, ModuleRepositoryProvider, useModuleRepository } from '@xyo-network/react-node'
import { usePromise } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ArchiveProvider, useArchive } from '../contexts'
import { ArchiveSelectEx } from './ArchiveSelectEx'

const apiConfig = { apiDomain: 'http://localhost:8080' }
const temp = 'temp'

const ModuleRepositoryDecorator: DecoratorFn = (Story, args) => {
  return (
    <ModuleRepositoryProvider defaultResolvers={{ beta: new RemoteModuleResolver(apiConfig) }}>
      <Story {...args} />
    </ModuleRepositoryProvider>
  )
}

const MemoryNodeResolverDecorator: DecoratorFn = (Story, args) => {
  const { resolvers } = useModuleRepository(true)
  return (
    <MemoryNodeProvider config={{ schema: NodeConfigSchema }} resolver={resolvers?.beta}>
      <Story {...args} />
    </MemoryNodeProvider>
  )
}

const ArchiveDecorator: DecoratorFn = (Story, args) => (
  <ArchiveProvider defaultArchive={temp}>
    <Story {...args} />
  </ArchiveProvider>
)

const StorybookEntry = {
  argTypes: {},
  component: ArchiveSelectEx,
  decorators: [ArchiveDecorator, MemoryNodeResolverDecorator, ModuleRepositoryDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archive/ArchiveArchivist',
}

const Template: ComponentStory<typeof ArchiveSelectEx> = () => {
  const { archivePayloadArchivist, archiveBoundWitnessArchivist, archive } = useArchive()
  const [payloadHash, setPayloadHash] = useState<string>('')
  const [boundwitnessHash, setBoundwitnessHash] = useState<string>('')

  const payloadRequest = archivePayloadArchivist && payloadHash ? archivePayloadArchivist?.get([payloadHash]) : undefined
  const boundwitnessHashRequest = archiveBoundWitnessArchivist && boundwitnessHash ? archiveBoundWitnessArchivist?.get([boundwitnessHash]) : undefined

  const [payloadResult] = usePromise(payloadRequest, [archivePayloadArchivist, payloadHash])
  const [boundwitnessResult] = usePromise(boundwitnessHashRequest, [archivePayloadArchivist, boundwitnessHash])

  return (
    <FlexCol rowGap={3} width={'100%'}>
      <TextField
        fullWidth
        value={payloadHash}
        placeholder={`payload hash in ${archive} on ${apiConfig.apiDomain}`}
        onChange={(e) => setPayloadHash(e.target.value)}
      />
      <Typography>Payload from Archive Archivist Module:</Typography>
      <pre>{JSON.stringify(payloadResult?.shift(), null, 2)}</pre>
      <TextField
        fullWidth
        value={boundwitnessHash}
        placeholder={`boundwitness hash in ${archive} on ${apiConfig.apiDomain}`}
        onChange={(e) => setBoundwitnessHash(e.target.value)}
      />
      <Typography>Bound Witness from Archive Archivist Module:</Typography>
      <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{JSON.stringify(boundwitnessResult?.shift(), null, 2)}</pre>
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
