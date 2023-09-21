import { LocalGasStationRounded as LocalGasStationRoundedIcon } from '@mui/icons-material'
import { Avatar, AvatarProps } from '@mui/material'

export const EthereumGasPriceAvatar: React.FC<AvatarProps> = ({ ...props }) => {
  return (
    <Avatar {...props}>
      <LocalGasStationRoundedIcon />
    </Avatar>
  )
}
