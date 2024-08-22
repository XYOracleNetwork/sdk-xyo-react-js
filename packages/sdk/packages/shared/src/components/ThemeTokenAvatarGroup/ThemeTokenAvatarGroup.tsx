import type { AvatarGroupProps } from '@mui/material'
import { AvatarGroup } from '@mui/material'
import React from 'react'

import { ThemeTokenAvatar } from '../ThemeTokenAvatar/index.ts'

export interface ThemeTokenAvatarGroupProps extends AvatarGroupProps {
  images?: string[]
}

export const ThemeTokenAvatarGroup: React.FC<ThemeTokenAvatarGroupProps> = ({ images, ...props }) => {
  return <AvatarGroup {...props}>{images?.map((image, index) => <ThemeTokenAvatar key={index} src={image} />)}</AvatarGroup>
}
