import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { NftScorePayload, NftScoreSchema } from '@xyo-network/crypto-wallet-nft-payload-plugin'
import { Payload } from '@xyo-network/payload-model'

export interface NftScoreRendererProps extends FlexBoxProps {
  payload?: Payload
}

const isNftScorePayload = (payload?: Payload): payload is NftScorePayload => {
  return payload?.schema === NftScoreSchema
}

export const NftScoreRenderer: React.FC<NftScoreRendererProps> = ({ payload, ...props }) => {
  const nftScorePayload = payload && isNftScorePayload(payload) ? (payload as NftScorePayload) : undefined
  const categories = nftScorePayload ? Object.entries(nftScorePayload).filter(([key]) => key !== 'schema') : undefined
  const sources = nftScorePayload?.sources?.length ? nftScorePayload.sources.join(', ') : undefined
  return (
    <FlexCol {...props}>
      <Typography variant="h1">{sources ? `NFT Scores (${sources})` : 'NFT Scores'}</Typography>
      {nftScorePayload?.timestamp ? <Typography variant="h4">{`[${new Date(nftScorePayload?.timestamp).toLocaleString()}]`}</Typography> : null}
      {categories ? (
        <Table>
          <TableHead>
            <TableCell key="spacer"></TableCell>
            <TableCell key="Actual">{'Actual'}</TableCell>
            <TableCell key="Possible">{'Possible'}</TableCell>
          </TableHead>
          <TableBody>
            {categories.map(([key, value]) => {
              return value ? (
                <TableRow key={key}>
                  <TableCell key="Category">{key}</TableCell>
                  {Object.entries(value).map(([key, value]) => {
                    return <TableCell key={`${key}`}>{value}</TableCell>
                  })}
                </TableRow>
              ) : null
            })}
          </TableBody>
        </Table>
      ) : null}
    </FlexCol>
  )
}
