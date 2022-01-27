import { FormControl, TextField, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { AuthState } from '../../../contexts'
import { LoginCredentials } from './LoginCredentials'

interface FormFieldsProps<S> {
  authState: AuthState
  credentialsState: [S, Dispatch<SetStateAction<S>>]
}

const FormFields: React.FC<FormFieldsProps<LoginCredentials>> = ({ authState, credentialsState }) => {
  const theme = useTheme()
  const TextFieldStyles = {
    marginBottom: theme.spacing(2),
  }
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
      <FormControl fullWidth={true}>
        <TextField
          required
          type="email"
          disabled={authState.isLoading}
          sx={TextFieldStyles}
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
          sx={TextFieldStyles}
          variant="outlined"
          name="password"
          type="password"
          placeholder="Password*"
          onChange={handleInputChange}
        />
      </FormControl>
    </>
  )
}

export { FormFields }
