import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { cloneElement, Component, ErrorInfo, ReactElement, ReactNode } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  // fallback as a static ReactNode value
  fallback?: ReactNode
  // fallback element that can receive the error as a prop
  fallbackWithErrorProp?: ReactElement<{ error: Error }>
}

export interface ErrorBoundaryState {
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${error}: ${errorInfo}`)
  }

  render() {
    if (this.state.error) {
      if (this.props.fallbackWithErrorProp) {
        const clone = cloneElement(this.props.fallbackWithErrorProp, { error: this.state.error })
        return clone
      }
      return (
        this.props.fallback ?? (
          <FlexCol>
            <Typography variant="h1">Something went wrong.</Typography>
            <Typography variant="body1">[{this.state.error?.message}]</Typography>
          </FlexCol>
        )
      )
    }

    return this.props.children
  }
}
