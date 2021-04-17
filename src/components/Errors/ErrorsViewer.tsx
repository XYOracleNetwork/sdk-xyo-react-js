import { BoxProps, IconButton } from '@material-ui/core'
import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'

import { FlexGrowCol } from '../FlexBox'
import ErrorViewer from './ErrorViewer'

interface Props extends BoxProps {
  errors?: Error[]
  onRetry?: () => void
}

const ErrorsViewer: React.FC<Props> = (props) => {
  const { onRetry, errors, ...boxProps } = props
  return (
    <FlexGrowCol padding={1} {...boxProps}>
      {errors?.map((error, index) => {
        return <ErrorViewer error={error} key={index} />
      })}
      {onRetry ? (
        <IconButton onClick={onRetry}>
          <AiOutlineReload />
        </IconButton>
      ) : null}
    </FlexGrowCol>
  )
}

export default ErrorsViewer
