import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect, useState } from 'react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../.storybook'
import { AuthServiceWrapper } from '../../components'
import { useAuthState } from '../Auth'
import { ArchivistApiLoader } from './Loader'
import { useArchivistApi } from './useArchivist'

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'http://localhost:8081',
    },
    authServiceList: {
      default: authServiceList,
    },
  },
  component: ArchivistApiLoader,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Archivist/ArchivistApiLoader',
} as ComponentMeta<WrappedAuthComponent>

const DemoArchiveFetcher = () => {
  const [myArchives, setMyArchives] = useState<string[]>([])
  const { api, currentToken } = useArchivistApi()
  const { jwtToken } = useAuthState().state
  useEffect(() => {
    if (jwtToken && currentToken) {
      api
        .getArchives()
        .then((archives) => setMyArchives(archives))
        .catch((e) => console.error(e))
    }
  }, [api, jwtToken, currentToken])

  return (
    <>
      <AuthServiceWrapper></AuthServiceWrapper>
      <p>My Archives</p>
      <ul>
        {myArchives.map((archive) => (
          <li key={archive}>{archive}</li>
        ))}
      </ul>
    </>
  )
}

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { jwtToken } = useAuthState().state
  return (
    <ArchivistApiLoader apiDomain="http://localhost:8081" jwtToken={jwtToken} archive="test">
      <DemoArchiveFetcher />
    </ArchivistApiLoader>
  )
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList,
  },
}
Default.decorators = [authDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
