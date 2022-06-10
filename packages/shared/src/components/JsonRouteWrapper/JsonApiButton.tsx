import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { useSearchParams } from 'react-router-dom'

export const JsonApiButton: React.FC<ButtonExProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <ButtonEx
      marginX={2}
      variant="outlined"
      onClick={() => {
        searchParams.set('json', 'true')
        setSearchParams(searchParams)
      }}
      {...props}
    >
      JSON
    </ButtonEx>
  )
}
