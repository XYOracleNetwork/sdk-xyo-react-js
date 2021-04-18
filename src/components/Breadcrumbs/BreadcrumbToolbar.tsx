import { BoxProps, Breadcrumbs, Link } from '@material-ui/core'
import { assertEx } from '@xyo-network/sdk-xyo-js'
import React, { ReactElement } from 'react'
import { Link as RouteLink } from 'react-router-dom'

import { FlexRow } from '../FlexBox'

interface Props extends BoxProps {
  logo?: string | ReactElement
  titles: string[]
}

const getPartialPath = (pathParts: string[], index: number) => {
  const result = []
  for (let i = 0; i <= index; i++) {
    result.push(`${pathParts[i]}/`)
  }
  return result.join('')
}

const BreadcrumbToolbar: React.FC<Props> = (props) => {
  const { titles, logo, ...boxProps } = props
  const pathParts = document.location.pathname.split('/')
  //if the url has a trailing '/', remove the last part
  if (pathParts[pathParts.length - 1].length === 0) {
    pathParts.pop()
  }

  assertEx(pathParts.length - 1 === titles.length, 'Path/Title length mismatch')
  return (
    <FlexRow marginY={1} justifyContent="flex-start" {...boxProps}>
      <Breadcrumbs aria-label="breadcrumb" separator="|">
        {pathParts.map((_pathPart, index) => {
          const path = getPartialPath(pathParts, index)
          return (
            <Link
              title={index > 0 ? titles[index - 1] : 'COIN'}
              color={index === pathParts.length - 1 ? 'textPrimary' : 'inherit'}
              key={path}
              component={RouteLink}
              to={path}
            >
              {index > 0 ? (
                titles[index - 1]
              ) : (
                <FlexRow>{typeof logo === 'string' ? <img src={logo} /> : logo}</FlexRow>
              )}
            </Link>
          )
        })}
      </Breadcrumbs>
    </FlexRow>
  )
}

export default BreadcrumbToolbar
