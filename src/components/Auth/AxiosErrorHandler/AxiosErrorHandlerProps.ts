import { AxiosError } from 'axios'

export interface AxiosErrorHandlerProps {
  apiError: AxiosError | undefined
  customError?: JSX.Element
  displayError?: boolean
  loginForm?: boolean
}
