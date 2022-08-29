import { AvatarGroup, AvatarGroupProps } from '@mui/material'

import { XyoThemeTokenAvatar } from '../XyoThemeTokenAvatar'

export interface XyoThemeTokenAvatarGroupProps extends AvatarGroupProps {
  images?: string[]
}

export const XyoThemeTokenAvatarGroup: React.FC<XyoThemeTokenAvatarGroupProps> = ({ images, ...props }) => {
  return (
    <AvatarGroup {...props}>
      {images?.map((image, index) => (
        <XyoThemeTokenAvatar key={index} src={image} />
      ))}
    </AvatarGroup>
  )
}
