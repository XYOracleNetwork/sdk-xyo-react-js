import { NftScorePayload, NftScoreSchema } from '@xyo-network/crypto-wallet-nft-payload-plugin'

export const payloadDataFullScores = {
  'Animation URL': [1, 1],
  Attributes: [10, 10],
  'Background Color': [1, 1],
  'Contract Address': [1, 1],
  Description: [1, 1],
  'External Url': [2, 2],
  Image: [3, 3],
  'Image Data': [1, 1],
  Name: [1, 1],
  Supply: [1, 1],
  'Token Id': [1, 1],
  Type: [1, 1],
  'YouTube URL': [1, 1],
  schema: NftScoreSchema,
} as unknown as NftScorePayload

export const payloadDataPartialScores: NftScorePayload = {
  'Animation URL': [10, 10],
  Attributes: [9, 10],
  'Background Color': [8, 10],
  'Contract Address': [7, 10],
  Description: [6, 10],
  'External Url': [5, 10],
  Image: [4, 10],
  'Image Data': [3, 10],
  Name: [2, 10],
  Supply: [1, 10],
  'Token Id': [0, 10],
  Type: [0, 10],
  'YouTube URL': [0, 10],
  schema: NftScoreSchema,
} as unknown as NftScorePayload
