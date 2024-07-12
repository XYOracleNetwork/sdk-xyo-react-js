import { AvatarGroup, AvatarGroupProps } from '@mui/material'

import { ThemeTokenAvatar } from '../ThemeTokenAvatar/index.js'

export interface ThemeTokenAvatarGroupProps extends AvatarGroupProps {
  images?: string[]
}

export const ThemeTokenAvatarGroup: React.FC<ThemeTokenAvatarGroupProps> = ({ images, ...props }) => {
  return <AvatarGroup {...props}>{images?.map((image, index) => <ThemeTokenAvatar key={index} src={image} />)}</AvatarGroup>
}
