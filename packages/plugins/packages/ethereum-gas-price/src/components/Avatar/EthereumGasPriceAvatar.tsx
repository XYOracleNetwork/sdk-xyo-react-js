import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import { Avatar, AvatarProps } from '@mui/material'
import { XyoPayloadRenderProps } from '@xyo-network/react-payload-plugin'

export const EthereumGasPriceAvatar: React.FC<XyoPayloadRenderProps & AvatarProps> = ({ ...props }) => {
  return (
    <Avatar {...props}>
      <LocalGasStationOutlinedIcon />
    </Avatar>
  )
}
