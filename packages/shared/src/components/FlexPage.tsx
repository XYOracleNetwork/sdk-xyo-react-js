import { Container, ContainerProps } from '@mui/material'
import { FlexBoxProps, FlexGrowCol, useAsyncEffect, useUserEvents } from '@xylabs/sdk-react'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
export interface FlexPageProps extends FlexBoxProps {
  container?: ContainerProps['maxWidth']
  breadcrumbs?: ReactNode
}

export const FlexPage: React.FC<FlexPageProps> = ({ title, container = 'xl', breadcrumbs, children, ...props }) => {
  const userEvents = useUserEvents()
  const { pathname } = useLocation()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      await userEvents?.viewContent({ name: title ?? 'NodeBasePage', path: location.pathname })
    },
    [pathname, title, userEvents]
  )

  const Body: React.FC<FlexBoxProps> = (props) => (
    <FlexGrowCol gap={2} paddingY={2} justifyContent="flex-start" alignItems="stretch" {...props}>
      {breadcrumbs}
      {children}
    </FlexGrowCol>
  )

  return (
    <FlexGrowCol alignItems="stretch" justifyContent="flex-start" minHeight={0} overflow="visible scroll">
      <Helmet title={title} />
      {container ? (
        <Container style={{ alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-start' }} maxWidth={container}>
          <Body {...props} />
        </Container>
      ) : (
        <Body {...props} />
      )}
    </FlexGrowCol>
  )
}
