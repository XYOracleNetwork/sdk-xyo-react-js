import type { AvatarGroupProps } from '@mui/material'
import { Avatar, AvatarGroup } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import React, { useRef } from 'react'

export interface AddressAvatarGroupProps extends AvatarGroupProps {
  addresses?: string[]
  maxAvatars?: number
}

export const AddressAvatarGroup: React.FC<AddressAvatarGroupProps> = ({
  addresses, maxAvatars = 4, ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const size = ref.current ? ref.current.clientWidth * 0.65 : undefined

  return (
    <AvatarGroup max={maxAvatars} total={addresses?.length} {...props}>
      {addresses?.map(address => (
        <Avatar key={address} title={address} ref={ref} sx={{ bgcolor: 'background.paper' }}>
          <Identicon value={address} position="absolute" p={0.25} top={0} bottom={0} left={0} right={0} size={size} />
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
