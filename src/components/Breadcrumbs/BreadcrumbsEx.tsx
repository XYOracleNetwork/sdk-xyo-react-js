import { Breadcrumbs, Link } from '@mui/material'
import { assertEx } from '@xyo-network/sdk-xyo-js'
import React from 'react'
import { Link as RouteLink } from 'react-router-dom'

import { FlexRow } from '../FlexBox'
import BreadcrumbsExProps from './BreadcrumbsExProps'

const getPartialPath = (pathParts: string[], index: number) => {
  const result = []
  for (let i = 0; i <= index; i++) {
    result.push(`${pathParts[i]}/`)
  }
  return result.join('')
}

const BreadcrumbsEx: React.FC<BreadcrumbsExProps> = ({
  titles,
  path = document.location.pathname,
  separator = '|',
  logo,
  children,
  ...props
}) => {
  const pathParts = path.split('/')
  //if the url has a trailing '/', remove the last part
  if (pathParts[pathParts.length - 1]?.length === 0) {
    pathParts.pop()
  }

  assertEx(
    pathParts.length - 1 === titles?.length,
    `Path/Title length mismatch: ${JSON.stringify(titles)} with ${JSON.stringify(pathParts)}`
  )
  return (
    <Breadcrumbs separator={separator} {...props}>
      {pathParts.map((_pathPart, index) => {
        const path = getPartialPath(pathParts, index)
        return (
          <Link
            title={index > 0 ? titles?.[index - 1] : 'COIN'}
            color={index === pathParts.length - 1 ? 'textPrimary' : 'inherit'}
            key={path}
            component={RouteLink}
            to={path}
          >
            {index > 0 ? (
              titles?.[index - 1]
            ) : (
              <FlexRow>{typeof logo === 'string' ? <img src={logo} /> : logo}</FlexRow>
            )}
          </Link>
        )
      })}
      {children}
    </Breadcrumbs>
  )
}

export default BreadcrumbsEx
