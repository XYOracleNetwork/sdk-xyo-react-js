import type { ContainerProps } from '@mui/material'
import { Container } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useIsDark } from '@xylabs/react-theme'
import React, { useState } from 'react'

import type { FooterAlwaysLinksProps } from './AlwaysLinks.tsx'
import { FooterAlwaysLinks } from './AlwaysLinks.tsx'

export interface FooterProps extends FlexBoxProps {
  alwaysFooterLinksProps?: FooterAlwaysLinksProps
  container?: ContainerProps['maxWidth'] | 'none'
  dynamicHeight?: boolean
}

export const Footer: React.FC<FooterProps> = ({
  alwaysFooterLinksProps, children, container, dynamicHeight = false, ...props
}) => {
  const [more, setMore] = useState(false)
  const onMore = () => {
    setMore(!more)
  }

  const darkMode = useIsDark()
  console.log('darkMode', darkMode)

  return (
    <FlexCol
      alignItems="stretch"
      onMouseLeave={() => {
        setMore(false)
      }}
      {...props}
    >
      {more && dynamicHeight
        ? (
            <FlexCol alignItems="stretch">
              <FlexRow paper bottom={-1} position="absolute" width="100%">
                {container && container !== 'none'
                  ? <Container>{children}</Container>
                  : children}
              </FlexRow>
            </FlexCol>
          )
        : null}
      {dynamicHeight
        ? null
        : (
            <FlexCol alignItems="stretch">
              {container && container !== 'none'
                ? <Container>{children}</Container>
                : children}
            </FlexCol>
          )}
      <FlexRow>
        {container && container !== 'none'
          ? (
              <Container>
                <FooterAlwaysLinks {...alwaysFooterLinksProps} onMore={dynamicHeight ? onMore : undefined} />
              </Container>
            )
          : <FooterAlwaysLinks {...alwaysFooterLinksProps} onMore={dynamicHeight ? onMore : undefined} />}
      </FlexRow>
    </FlexCol>
  )
}
