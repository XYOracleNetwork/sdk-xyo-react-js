import { FormControl, TextField } from '@mui/material'
import { ButtonEx } from '@xylabs/sdk-react'
import { Dispatch, memo, SetStateAction } from 'react'

import { LoginCredentials } from './LoginCredentials'

interface FormFieldsProps<S> {
  isLoading: boolean
  credentialsState: [S, Dispatch<SetStateAction<S>>]
}

const FormFieldsComponent: React.FC<FormFieldsProps<LoginCredentials>> = ({ isLoading, credentialsState }) => {
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
          inputProps={{ 'data-testid': 'email' }}
          type="email"
          disabled={isLoading}
          value={credentials.email}
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
          inputProps={{ 'data-testid': 'password' }}
          disabled={isLoading}
          value={credentials.password}
          variant="outlined"
          name="password"
          type="password"
          placeholder="Password*"
          onChange={handleInputChange}
        />
      </FormControl>
      <ButtonEx disabled={isLoading} variant="contained" type="submit">
        Login
      </ButtonEx>
    </>
  )
}

const FormFields = memo(FormFieldsComponent)

export { FormFields }
