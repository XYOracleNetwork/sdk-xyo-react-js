import { Container, ContainerProps, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { FooterAlwaysLinks, FooterAlwaysLinksProps } from './AlwaysLinks'

export interface FooterProps extends FlexBoxProps {
  alwaysFooterLinksProps?: FooterAlwaysLinksProps
  container?: ContainerProps['maxWidth'] | 'none'
  dynamicHeight?: boolean
}

export const Footer: React.FC<FooterProps> = ({ alwaysFooterLinksProps, children, container, dynamicHeight = false, ...props }) => {
  const [more, setMore] = useState(false)
  const onMore = () => {
    setMore(!more)
  }

  const theme = useTheme()

  return (
    <FlexCol
      alignItems="stretch"
      onMouseLeave={() => {
        setMore(false)
      }}
      {...props}
    >
      {more && dynamicHeight ? (
        <FlexCol alignItems="stretch">
          <FlexRow bottom={-1} position="absolute" width="100%" bgcolor={theme.palette.background.default}>
            {container && container !== 'none' ? <Container>{children}</Container> : children}
          </FlexRow>
        </FlexCol>
      ) : null}
      {dynamicHeight ? null : (
        <FlexCol alignItems="stretch">{container && container !== 'none' ? <Container>{children}</Container> : children}</FlexCol>
      )}
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
