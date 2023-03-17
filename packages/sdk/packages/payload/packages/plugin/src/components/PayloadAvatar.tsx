import { Avatar, AvatarProps } from '@mui/material'

import { DefaultAvatarIcon } from '../img'
import { PayloadRenderProps } from '../PayloadRenderPlugin'

export const PayloadAvatar: React.FC<PayloadRenderProps & AvatarProps> = ({ ...props }) => {
  return <Avatar src={DefaultAvatarIcon} {...props} />
}
