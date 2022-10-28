/* eslint-disable import/no-internal-modules */
import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoError, XyoErrorSchema } from '@xyo-network/module'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { AuthStatusIconButton } from '@xyo-network/react-auth'
import { archivistApiDecorator, authDecorator } from '@xyo-network/react-storybook'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

import { XyoErrorRender } from './Render'

const StorybookEntry = {
  argTypes: {
    authState: {
      jwtToken: 'badToken',
      loggedInAccount: 'none@none.com',
    },
  },
  component: XyoErrorRender,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'auth-service/XyoApiErrorRender',
} as ComponentMeta<typeof XyoErrorRender>

const TemplateStats: ComponentStory<typeof XyoErrorRender> = () => {
  const [xyoError, setXyoError] = useState<XyoError>()
  const [stats, setStats] = useState<{ count: number }>()
  const { api } = useArchivistApi()
  const { archive } = useArchive()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        const response = await api?.archive(archive).block.stats.get()
        setStats(response)
        setXyoError(undefined)
      } catch (ex) {
        const error = ex as Error
        setXyoError({ message: error.message, schema: XyoErrorSchema, sources: [] })
      }
    },
    [api, archive],
  )

  return (
    <>
      <AuthStatusIconButton />
      <XyoErrorRender xyoError={xyoError}>
        <p>Stats: {stats?.count}</p>
      </XyoErrorRender>
    </>
  )
}

const Template401: ComponentStory<typeof XyoErrorRender> = () => {
  const [xyoError, setXyoError] = useState<XyoError>()
  const [response, setResponse] = useState<AxiosResponse>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    try {
      const response = await axios.get('http://httpstat.us/401')
      setResponse(response)
      setXyoError(undefined)
    } catch (ex) {
      const error = ex as Error
      setXyoError({ message: error.message, schema: XyoErrorSchema, sources: [] })
    }
  }, [])

  return (
    <>
      <XyoErrorRender xyoError={xyoError}>
        <FlexCol>
          <AuthStatusIconButton />
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </FlexCol>
      </XyoErrorRender>
    </>
  )
}

const Template500: ComponentStory<typeof XyoErrorRender> = () => {
  const [xyoError, setXyoError] = useState<XyoError>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        await axios.get('http://httpstat.us/500')
        setXyoError(undefined)
      } catch (ex) {
        const error = ex as Error
        setXyoError({ message: error.message, schema: XyoErrorSchema, sources: [] })
      }
    },
    [],
  )

  return (
    <XyoErrorRender xyoError={xyoError}>
      <Typography>I should never show</Typography>
    </XyoErrorRender>
  )
}

const Template404: ComponentStory<typeof XyoErrorRender> = () => {
  const [xyoError, setXyoError] = useState<XyoError>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      try {
        await axios.get('https://beta.xyo.network/somelongstringthatisntarealhashbutcouldbe')
        setXyoError(undefined)
      } catch (ex) {
        const error = ex as Error
        setXyoError({ message: error.message, schema: XyoErrorSchema, sources: [] })
      }
    },
    [],
  )

  return (
    <XyoErrorRender xyoError={xyoError}>
      <Typography>I should never show</Typography>
    </XyoErrorRender>
  )
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
