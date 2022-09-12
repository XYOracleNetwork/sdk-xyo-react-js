import { Button, Typography } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useEffect, useState } from 'react'

import { AuthSetsProvider, AuthSetsProviderProps } from '../contexts'
import { betaApiDomain, defaultAuthSets, localStorageSets } from './authSetsData.stories'
import { ManageAuthSetsDataList } from './ManageAuthSetsDataList'

/**
 * Mostly used to test the AuthSetsProvider functionality
 */

// eslint-disable-next-line import/no-default-export
export default {
  component: ManageAuthSetsDataList,
  title: 'authSets/AuthSetsProvider/ManageAuthSetsDataList',
} as Meta

const LocalStorageDecorator: DecoratorFn = (Story, args) => {
  localStorage.setItem('XyoAuthSets', '')
  localStorage.setItem('XyoAuthSets', JSON.stringify(Array.from(localStorageSets.entries())))

  return <Story {...args} />
}

const LocalStorageCleanerDecorator: DecoratorFn = (Story, args) => {
  localStorage.removeItem('XyoAuthSets')
  return <Story {...args} />
}

const LocalStorageState = () => {
  const [savedSets, setSavedSets] = useState('')

  const handleClick = () => setSavedSets(localStorage.getItem('XyoAuthSets') ?? '')

  useEffect(() => {
    // refresh localStorage once on load
    handleClick()
  }, [])

  return (
    <>
      <Button sx={{ mt: 2 }} variant="contained" onClick={handleClick}>
        Refresh LocalStorage
      </Button>
      {savedSets ? (
        <>
          <Typography variant="h2" mt={3}>
            In localStorage
          </Typography>
          <pre>{JSON.stringify(JSON.parse(savedSets ?? ''), null, 2)}</pre>
        </>
      ) : null}
    </>
  )
}

const Template: ComponentStory<React.FC<AuthSetsProviderProps>> = (props) => {
  return (
    <AuthSetsProvider {...props}>
      <ManageAuthSetsDataList />
      <LocalStorageState />
    </AuthSetsProvider>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [LocalStorageCleanerDecorator]

const WithProviderData = Template.bind({})
WithProviderData.decorators = [LocalStorageCleanerDecorator]
WithProviderData.args = {
  activeIssuer: betaApiDomain,
  defaultAuthSets,
}

const WithLocalStorage = Template.bind({})
WithLocalStorage.decorators = [LocalStorageDecorator]
WithLocalStorage.args = {
  activeIssuer: 'http://someApi.com',
}

export { Default, WithLocalStorage, WithProviderData }
