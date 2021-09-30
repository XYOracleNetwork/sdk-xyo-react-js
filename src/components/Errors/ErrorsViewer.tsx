import { IconButton } from '@material-ui/core'
import React from 'react'
import { AiOutlineReload } from 'react-icons/ai'

import { FlexGrowCol } from '../FlexBox'
import ErrorsViewerProps from './ErrorsViewerProps'
import ErrorViewer from './ErrorViewer'

const ErrorsViewer: React.FC<ErrorsViewerProps> = (props) => {
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
