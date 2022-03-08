import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { ArchiveResponse } from '@xyo-network/sdk-xyo-client-js'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'

import { authDecorator, authServiceList } from '../../.storybook'
import { useArchivistApi } from '../../contexts'
import { AuthStatusIndicator } from './AuthStatusIndicator'
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

  useAsyncEffect(async () => {
    try {
      const response = await api?.getBoundWitnessStats()
      setStats(response)
      setApiError(undefined)
    } catch (error) {
      setApiError(error as AxiosError)
    }
  }, [api])

  return (
    <>
      <AuthStatusIndicator />
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

  useAsyncEffect(async () => {
    try {
      if (api) {
        const response = await api.getArchives()
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
        <AuthStatusIndicator />
        <ul>{archives.length > 0 && archives.map((archive, index) => <li key={index}>{archive.archive}</li>)}</ul>
      </AxiosErrorHandler>
    </>
  )
}

const Template500: ComponentStory<typeof AxiosErrorHandler> = () => {
  const [apiError, setApiError] = useState<AxiosError>()

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
const NoAuthFallback = TemplateArchives.bind({})
const Server500 = Template500.bind({})

export { AuthRequired, NoAuthFallback, Server500 }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
