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
  'Animation URL': [0, 1],
  Attributes: [0, 10],
  'Background Color': [0, 1],
  'Contract Address': [0, 1],
  Description: [0, 1],
  'External Url': [0, 2],
  Image: [0, 3],
  'Image Data': [1, 1],
  Name: [0, 1],
  Supply: [0, 1],
  'Token Id': [0, 1],
  Type: [0, 1],
  'YouTube URL': [0, 1],
  schema: NftScoreSchema,
} as unknown as NftScorePayload