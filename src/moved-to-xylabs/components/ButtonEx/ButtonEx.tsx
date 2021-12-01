/* eslint-disable @delagen/deprecation/deprecation */
import ButtonExBase from './ButtonExBase'
import ButtonExProps from './ButtonExProps'
import ButtonExTo from './ButtonExTo'

/** @deprecated Moved to @xylabs/sdk-react */
const ButtonEx: React.FC<ButtonExProps> = ({ to, ...props }) => {
  if (to) {
    return <ButtonExTo to={to} {...props} />
  } else {
    return <ButtonExBase {...props} />
  }
}

export default ButtonEx
