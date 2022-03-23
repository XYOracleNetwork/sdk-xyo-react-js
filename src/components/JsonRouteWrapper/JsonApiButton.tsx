import { ButtonEx, ButtonExProps } from '@xylabs/sdk-react'
import { useSearchParams } from 'react-router-dom'

export const JsonApiButton: React.FC<ButtonExProps> = (props) => {
  const [, setSearchParams] = useSearchParams()
  return (
    <ButtonEx marginX={2} variant="outlined" onClick={() => setSearchParams({ json: 'true' })} {...props}>
      JSON
    </ButtonEx>
  )
}
