import { ButtonEx, LinkToEx } from '@xylabs/sdk-react'
import { HTMLAttributeAnchorTarget } from 'react'
import { useLocation } from 'react-router-dom'

interface JsonApiLinkProps {
  target?: HTMLAttributeAnchorTarget
}

const JsonApiLink: React.FC<JsonApiLinkProps> = ({ children, target }) => {
  const { pathname } = useLocation()
  return (
    <LinkToEx to={`${pathname}/json`} target={target || '_self'}>
      {children || (
        <ButtonEx marginX={2} variant="outlined">
          JSON
        </ButtonEx>
      )}
    </LinkToEx>
  )
}

export { JsonApiLink }
