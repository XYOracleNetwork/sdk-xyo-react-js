import { Avatar, AvatarProps } from '@mui/material'
import React from 'react'

import { DefaultAvatarIcon } from '../img/index.ts'
import { PayloadRenderProps } from '../PayloadRenderPlugin.ts'

export const PayloadAvatar: React.FC<PayloadRenderProps & AvatarProps> = ({ ...props }) => {
  return <Avatar src={DefaultAvatarIcon} {...props} />
}
