export const AuthSetSchema = 'network.xyo.authset'

export interface AuthSet {
  token?: string
  address?: string
  issuer?: string
  account?: string
  identifier?: string
  reAuthenticate?: boolean
  schema: string
}
