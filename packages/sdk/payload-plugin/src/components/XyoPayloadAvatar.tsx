import { Avatar, AvatarProps } from '@mui/material'

import { DefaultAvatarIcon } from '../img'
import { XyoPayloadRenderProps } from '../XyoPayloadRenderPlugin'

export const XyoPayloadAvatar: React.FC<XyoPayloadRenderProps & AvatarProps> = ({ ...props }) => {
  return <Avatar src={DefaultAvatarIcon} {...props} />
}
