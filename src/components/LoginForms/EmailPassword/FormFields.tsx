import { createTheme, FormControl, TextField, ThemeProvider, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { AuthState } from '../../../contexts'
import { LoginCredentials } from './LoginCredentials'

interface FormFieldsProps<S> {
  authState: AuthState
  credentialsState: [S, Dispatch<SetStateAction<S>>]
}

const FormFields: React.FC<FormFieldsProps<LoginCredentials>> = ({ authState, credentialsState }) => {
  const baseTheme = useTheme()
  const authFormThemeOptions = {
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: baseTheme.spacing(2),
          },
        },
      },
    },
  }

  const authFormTheme = createTheme(authFormThemeOptions)
  const [credentials, setCredentials] = credentialsState

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setCredentials({
      ...credentials,
      ...{
        [name]: value,
      },
    })
  }

  return (
    <>
      <ThemeProvider theme={authFormTheme}>
        <FormControl fullWidth={true}>
          <TextField
            required
            type="email"
            disabled={authState.isLoading}
            variant="outlined"
            autoFocus={true}
            name="email"
            placeholder="Email*"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <TextField
            required
            disabled={authState.isLoading}
            variant="outlined"
            name="password"
            type="password"
            placeholder="Password*"
            onChange={handleInputChange}
          />
        </FormControl>
      </ThemeProvider>
    </>
  )
}

export { FormFields }
