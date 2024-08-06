import {
  CheckCircle as CheckCircleIcon,
  Dangerous as DangerousIcon,
  EmojiEvents as EmojiEventsIcon,
  ReportProblem as ReportProblemIcon,
} from '@mui/icons-material'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { NftScore, NftScoreSchema } from '@xyo-network/crypto-nft-payload-plugin'
import { Score } from '@xyo-network/crypto-nft-score-model'
import { Payload } from '@xyo-network/payload-model'
import React from 'react'

export interface NftScoreRendererProps extends FlexBoxProps {
  payload?: Payload
}

const isNftScorePayload = (payload?: Payload): payload is NftScore => {
  return payload?.schema === NftScoreSchema
}

const isScore = (entry: [unknown, unknown]): entry is [string, Score] => {
  const [key, value] = entry
  if (typeof key !== 'string') return false
  if (!Array.isArray(value)) return false
  if (value.length !== 2) return false
  if (typeof value[0] !== 'number') return false
  if (typeof value[1] !== 'number') return false
  return true
}

const getScoreIcon = (score: Score) => {
  const [actual, possible] = score
  const percent = actual / possible
  if (percent >= 0.9) return <EmojiEventsIcon />
  if (percent >= 0.75) return <CheckCircleIcon />
  if (percent >= 0.5) return <ReportProblemIcon />
  return <DangerousIcon />
}

export const NftScoreRenderer: React.FC<NftScoreRendererProps> = ({ payload, ...props }) => {
  const nftScorePayload = payload && isNftScorePayload(payload) ? (payload as NftScore) : undefined
  const categories = nftScorePayload ? Object.entries(nftScorePayload).filter(isScore) : undefined
  const sources = nftScorePayload?.sources?.length ? nftScorePayload.sources.join(', ') : undefined
  // this is temporary so that we can add the ability to get a timestamp via diviner later
  const timestamp = Date.now()
  return (
    <FlexCol {...props}>
      <Typography variant="h1">{sources ? `NFT Scores (${sources})` : 'NFT Scores'}</Typography>
      {timestamp
        ? <Typography variant="h4">{`[${new Date(timestamp).toLocaleString()}]`}</Typography>
        : null}
      {categories
        ? (
            <Table>
              <TableHead>
                <TableCell key="Spacer"></TableCell>
                <TableCell key="Actual">Actual</TableCell>
                <TableCell key="Possible">Possible</TableCell>
                <TableCell key="Rating">Rating</TableCell>
              </TableHead>
              <TableBody>
                {categories.map(([category, score]) => {
                  return score
                    ? (
                        <TableRow key={category}>
                          <TableCell key="Category">{category}</TableCell>
                          <TableCell key="Actual">{score[0]}</TableCell>
                          <TableCell key="Possible">{score[1]}</TableCell>
                          <TableCell key="Rating">{getScoreIcon(score)}</TableCell>
                        </TableRow>
                      )
                    : null
                })}
              </TableBody>
            </Table>
          )
        : null}
    </FlexCol>
  )
}
