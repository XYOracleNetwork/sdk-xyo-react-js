/* eslint-disable import/no-internal-modules */
import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchive } from '@xyo-network/api'
import { authDecorator, WrappedAuthComponent } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { ApiProvider, useApi } from '../../contexts'
import { ApiHistory } from './ApiHistory'

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'https://beta.api.archivist.xyo.network',
    },
  },
  component: ApiProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archivist-api/ApiHistory/ApiHistory',
} as ComponentMeta<WrappedAuthComponent>

const DemoArchiveFetcher = () => {
  const [myArchives, setMyArchives] = useState<XyoArchive[]>([])
  const { api } = useApi()
  const [successfulCall, setSuccessfulCall] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const archives = await api?.archives?.get()
      if (archives && mounted()) {
        setMyArchives(archives)
        setSuccessfulCall(true)
      }
    },
    [api?.archives],
  )

  return (
    <>
      <p>Archives</p>
      {successfulCall && (
        <Typography color="success.main" variant="body1">
          Successfully made request
        </Typography>
      )}
      <ul>
        {myArchives.map((archive, index) => (
          <li key={index}>{archive.archive}</li>
        ))}
      </ul>
      <Typography variant="h6">Responses</Typography>
      <ApiHistory />
    </>
  )
}

const Template: ComponentStory<WrappedAuthComponent> = () => {
  return (
    <ApiProvider
      errorHistoryMaxDepth={10}
      successHistoryMaxDepth={10}
      failureHistoryMaxDepth={10}
      responseHistoryMaxDepth={10}
      apiDomain="https://beta.api.archivist.xyo.network"
    >
      <DemoArchiveFetcher />
    </ApiProvider>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
