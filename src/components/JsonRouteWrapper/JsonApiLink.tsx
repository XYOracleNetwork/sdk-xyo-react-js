import { ButtonEx } from '@xylabs/sdk-react'
import { useSearchParams } from 'react-router-dom'

const JsonApiLink = () => {
  const [, setSearchParams] = useSearchParams()
  return (
    <ButtonEx marginX={2} variant="outlined" onClick={() => setSearchParams({ json: 'true' })}>
      JSON
    </ButtonEx>
  )
}

export { JsonApiLink }
