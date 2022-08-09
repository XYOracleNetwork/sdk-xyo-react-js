/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { archivistApiDecorator, authDecorator } from '@xyo-network/react-storybook'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

import { useArchive } from '../../../../archive/src'
import { useArchivistApi } from '../../../../archivist-api/src'
import { AuthStatusIconButton } from '../../../../auth/src'
import { XyoApiErrorRender } from './Render'

const StorybookEntry = {
  argTypes: {
    authState: {
      jwtToken: 'badToken',
      loggedInAccount: 'none@none.com',
    },
  },
  component: XyoApiErrorRender,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'auth-service/XyoApiErrorRender',
} as ComponentMeta<typeof XyoApiErrorRender>

const TemplateStats: ComponentStory<typeof XyoApiErrorRender> = () => {
  const [apiError, setApiError] = useState<XyoApiError>()
  const [stats, setStats] = useState<{ count: number }>()
  const { api } = useArchivistApi()
  const { archive } = useArchive()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        const response = await api?.archive(archive).block.stats.get()
        setStats(response)
        setApiError(undefined)
      } catch (error) {
        setApiError(error as XyoApiError)
      }
    },
    [api, archive]
  )

  return (
    <>
      <AuthStatusIconButton />
      <XyoApiErrorRender apiError={apiError}>
        <p>Stats: {stats?.count}</p>
      </XyoApiErrorRender>
    </>
  )
}

const Template401: ComponentStory<typeof XyoApiErrorRender> = () => {
  const [apiError, setApiError] = useState<XyoApiError>()
  const [response, setResponse] = useState<AxiosResponse>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    try {
      const response = await axios.get('http://httpstat.us/401')
      setResponse(response)
      setApiError(undefined)
    } catch (error) {
      setApiError(error as XyoApiError)
    }
  }, [])

  return (
    <>
      <XyoApiErrorRender apiError={apiError}>
        <AuthStatusIconButton />
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </XyoApiErrorRender>
    </>
  )
}

const Template500: ComponentStory<typeof XyoApiErrorRender> = () => {
  const [apiError, setApiError] = useState<XyoApiError>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        await axios.get('http://httpstat.us/500')
        setApiError(undefined)
      } catch (error) {
        setApiError(error as XyoApiError)
      }
    },
    []
  )

  return <XyoApiErrorRender apiError={apiError}>I should never show</XyoApiErrorRender>
}

const Template404: ComponentStory<typeof XyoApiErrorRender> = () => {
  const [apiError, setApiError] = useState<XyoApiError>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        await axios.get('https://beta.xyo.network/somelongstringthatisntarealhashbutcouldbe')
        setApiError(undefined)
      } catch (error) {
        setApiError(error as XyoApiError)
      }
    },
    []
  )

  return <XyoApiErrorRender apiError={apiError}>I should never show</XyoApiErrorRender>
}

TemplateStats.decorators = [archivistApiDecorator]
Template401.decorators = [archivistApiDecorator]
Template500.decorators = [archivistApiDecorator]

const AuthRequired = TemplateStats.bind({})
const UnAuthedFallback = Template401.bind({})
const Server404 = Template404.bind({})
const Server500 = Template500.bind({})

export { AuthRequired, Server404, Server500, UnAuthedFallback }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
