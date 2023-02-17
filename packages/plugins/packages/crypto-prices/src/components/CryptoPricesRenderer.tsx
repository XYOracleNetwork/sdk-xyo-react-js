import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoCoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import { XyoPayload } from '@xyo-network/payload-model'

export interface CryptoPricesRendererProps extends FlexBoxProps {
  payload?: XyoPayload
}

export const CryptoPricesRenderer: React.FC<CryptoPricesRendererProps> = ({ payload, ...props }) => {
  const cryptoMarketPayload = payload as XyoCoingeckoCryptoMarketPayload | undefined
  const assets = cryptoMarketPayload?.assets
  return (
    <FlexCol {...props}>
      <Typography variant="h1">Crypto Prices</Typography>
      {cryptoMarketPayload?.timestamp ? (
        <Typography variant="h4">{`[${new Date(cryptoMarketPayload?.timestamp).toLocaleString()}]`}</Typography>
      ) : null}
      {assets ? (
        <Table>
          <TableHead>
            <TableCell key="spacer"></TableCell>
            {Object.entries(Object.values(assets)).map(([key]) => {
              return <TableCell key={key}>{key}</TableCell>
            })}
          </TableHead>
          <TableBody>
            {Object.entries(cryptoMarketPayload.assets).map(([key, value]) => {
              return value ? (
                <TableRow key={key}>
                  <TableCell key="asset">{key}</TableCell>
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
