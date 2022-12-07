import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import { Avatar, AvatarProps } from '@mui/material'

export const EthereumGasPriceAvatar: React.FC<AvatarProps> = ({ ...props }) => {
  return (
    <Avatar {...props}>
      <LocalGasStationOutlinedIcon />
    </Avatar>
  )
}
