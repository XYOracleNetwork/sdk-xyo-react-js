import { Avatar, AvatarProps } from '@mui/material'

import { DefaultAvatarIcon } from '../img/index.js'
import { PayloadRenderProps } from '../PayloadRenderPlugin.js'

export const PayloadAvatar: React.FC<PayloadRenderProps & AvatarProps> = ({ ...props }) => {
  return <Avatar src={DefaultAvatarIcon} {...props} />
}
