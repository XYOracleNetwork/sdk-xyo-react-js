/* eslint-disable @delagen/deprecation/deprecation */
import EthAccountBase from './EthAccountBase'
import EthAccountProps from './EthAccountProps'
import EthAccountTo from './EthAccountTo'

/** @deprecated Moved to @xylabs/sdk-react */
const ButtonEx: React.FC<EthAccountProps> = ({ to, toOptions, ...props }) => {
  if (to || toOptions) {
    return <EthAccountTo to={to} toOptions={toOptions} {...props} />
  } else {
    return <EthAccountBase {...props} />
  }
}

export default ButtonEx
