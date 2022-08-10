import { Container, ContainerProps } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { FooterAlwaysLinks, FooterAlwaysLinksProps } from './AlwaysLinks'

export interface FooterProps extends FlexBoxProps {
  container?: ContainerProps['maxWidth'] | 'none'
  alwaysFooterLinksProps?: FooterAlwaysLinksProps
  dynamicHeight?: boolean
}

export const Footer: React.FC<FooterProps> = ({ children, alwaysFooterLinksProps, container, dynamicHeight = false, ...props }) => {
  const [more, setMore] = useState(false)
  const onMore = () => {
    setMore(!more)
  }

  return (
    <FlexCol
      alignItems="stretch"
      onMouseLeave={() => {
        setMore(false)
      }}
      {...props}
    >
      {more || !dynamicHeight ? (
        <FlexRow alignItems="flex-start">{container && container !== 'none' ? <Container>{children}</Container> : children}</FlexRow>
      ) : null}
      <FlexRow>
        {container && container !== 'none' ? (
          <Container>
            <FooterAlwaysLinks {...alwaysFooterLinksProps} onMore={dynamicHeight ? onMore : undefined} />
          </Container>
        ) : (
          <FooterAlwaysLinks {...alwaysFooterLinksProps} onMore={dynamicHeight ? onMore : undefined} />
        )}
      </FlexRow>
    </FlexCol>
  )
}
