import { Avatar, AvatarGroup, AvatarGroupProps } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { useLayoutEffect, useRef, useState } from 'react'

export interface AddressAvatarGroupProps extends AvatarGroupProps {
  addresses?: string[]
}

export const AddressAvatarGroup: React.FC<AddressAvatarGroupProps> = ({ addresses, ...props }) => {
  const [size, setSize] = useState<number>()
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current.clientWidth * 0.75)
    }
  }, [addresses])

  return (
    <AvatarGroup max={5} total={addresses?.length} {...props}>
      {addresses?.map((address, index) => (
        <Avatar key={index + address} title={address} ref={ref}>
          <Identicon value={address} position="absolute" p={0.25} top={0} bottom={0} left={0} right={0} size={size} />
        </Avatar>
      ))}
    </AvatarGroup>
  )
}
