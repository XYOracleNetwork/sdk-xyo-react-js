import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { ArchiveResponse } from '@xyo-network/sdk-xyo-client-js'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'

import { authDecorator, authServiceList } from '../../../.storybook'
import { useArchive, useArchivistApi } from '../../../contexts'
import { AuthStatusIconButton } from '../AuthStatusIconButton'
import { AxiosErrorHandler } from './AxiosErrorHandler'

const StorybookEntry = {
  argTypes: {
    authState: {
      defaultValue: {
        authServiceList,
        jwtToken: 'badToken',
        loggedInAccount: 'none@none.com',
      },
    },
  },
  component: AxiosErrorHandler,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AxiosErrorHandler',
} as ComponentMeta<typeof AxiosErrorHandler>

const TemplateStats: ComponentStory<typeof AxiosErrorHandler> = () => {
  const [apiError, setApiError] = useState<AxiosError>()
  const [stats, setStats] = useState<{ count: number }>()
  const { api } = useArchivistApi()
  const { archive } = useArchive()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    try {
      const response = await api?.archives.select(archive).block.getStats()
      setStats(response)
      setApiError(undefined)
    } catch (error) {
      setApiError(error as AxiosError)
    }
  }, [api, archive])

  return (
    <>
      <AuthStatusIconButton />
      <AxiosErrorHandler apiError={apiError}>
        <p>Stats: {stats?.count}</p>
      </AxiosErrorHandler>
    </>
  )
}

const TemplateArchives: ComponentStory<typeof AxiosErrorHandler> = () => {
  const [apiError, setApiError] = useState<AxiosError>()
  const [archives, setArchives] = useState<ArchiveResponse[]>([])
  const { api } = useArchivistApi()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    try {
      if (api) {
        const response = (await api.archives.get()) ?? []
        setArchives(response)
        setApiError(undefined)
      }
    } catch (error) {
      setApiError(error as AxiosError)
    }
  }, [api])

  return (
    <>
      <AxiosErrorHandler apiError={apiError}>
        <AuthStatusIconButton />
        <ul>{archives.length > 0 && archives.map((archive, index) => <li key={index}>{archive.archive}</li>)}</ul>
      </AxiosErrorHandler>
    </>
  )
}

const Template500: ComponentStory<typeof AxiosErrorHandler> = () => {
  const [apiError, setApiError] = useState<AxiosError>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    try {
      await axios.get('http://httpstat.us/500')
      setApiError(undefined)
    } catch (error) {
      setApiError(error as AxiosError)
    }
  }, [])

  return (
    <>
      <AxiosErrorHandler apiError={apiError}>I should never show</AxiosErrorHandler>
    </>
  )
}

const AuthRequired = TemplateStats.bind({})
const UnAuthedFallback = TemplateArchives.bind({})
const Server500 = Template500.bind({})

export { AuthRequired, Server500, UnAuthedFallback }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
