import { ButtonEx, ButtonExProps } from '@xylabs/react-button'

import { AuthActionType, useAuthState } from '../../contexts'

function generateToken(length: number) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
  const b = []
  for (let i = 0; i < length; i++) {
    const j = parseInt((Math.random() * (a.length - 1)).toFixed(0), 10)
    b[i] = a[j]
  }
  return b.join('')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InvalidTokenButton: React.FC<ButtonExProps> = ({ children, ...props }) => {
  const { state, dispatch } = useAuthState()
  generateToken(32)

  if (state && dispatch) {
    return (
      <ButtonEx
        onClick={() =>
          dispatch({
            payload: { jwtToken: generateToken(100), loggedInAccount: state.loggedInAccount },
            type: AuthActionType.AuthSuccessful,
          })
        }
        {...props}
      >
        Generate Fake Token
      </ButtonEx>
    )
  } else {
    return <></>
  }
}

export { InvalidTokenButton }
