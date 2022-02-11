import { ButtonEx, LinkToEx } from '@xylabs/sdk-react'
import { useLocation } from 'react-router-dom'

const JsonApiLink: React.FC = ({ children }) => {
  const { pathname } = useLocation()
  return (
    <LinkToEx to={`${pathname}/json`}>
      {children || (
        <ButtonEx marginX={2} variant="outlined">
          JSON
        </ButtonEx>
      )}
    </LinkToEx>
  )
}

export { JsonApiLink }
