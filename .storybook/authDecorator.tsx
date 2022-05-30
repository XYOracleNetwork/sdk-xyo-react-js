import { useTheme } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { FlexGrowCol, WithChildren } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, AuthThemeExtender, defaultState, useAuthState } from '../packages/auth/src'
import { ArchivistApiProvider } from '../packages/archivist-api/src'

const WithArchivistApi: React.FC<WithChildren> = ({ children }) => {
  const { state } = useAuthState()
  const theme = useTheme()

  if (state) {
    return (
      <ArchivistApiProvider apiDomain={state.apiDomain} jwtToken={state.jwtToken} required>
        <AuthThemeExtender themeOptions={theme}>
          {children}
        </AuthThemeExtender>
      </ArchivistApiProvider>
    )
  } else {
    return <></>
  }
}

export const authDecorator: DecoratorFn = (Story, { args }) => {
  const {authState} = args
  const mergedAuthState = {...defaultState(), ...authState}

  return (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <BrowserRouter>
        <AuthProvider authState={mergedAuthState}>
          <WithArchivistApi><Story {...args} /></WithArchivistApi>
        </AuthProvider>
      </BrowserRouter>
    </FlexGrowCol>
  )
}