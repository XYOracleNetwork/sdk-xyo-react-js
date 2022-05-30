import { FlexPage, FlexPageProps } from '../FlexPage'
import { NotFound } from './NotFound'

export const NotFoundPage: React.FC<FlexPageProps> = ({ title, ...props }) => (
  <FlexPage title={title ?? 'Sorry! Page Not Found'} {...props}>
    <NotFound />
  </FlexPage>
)
