import { ListItem } from "@mui/material"
import { EthAddress } from "@xylabs/eth-address"
import { EthAccountBox } from "@xylabs/react-crypto"

export interface ArchivistTypeProps {
  archivistType?: 'Commit' | 'Read' | 'Write'
  parentArchivists?: string[]
}

export const ArchivistParent: React.FC<ArchivistTypeProps> = ({ archivistType, parentArchivists }) => (
  <>
    {parentArchivists?.map((address) => {
      return (
        <ListItem key={address}>
          {archivistType} - <EthAccountBox key={address} address={EthAddress.fromString(address)} />
        </ListItem>
      )
    })}
  </>
)