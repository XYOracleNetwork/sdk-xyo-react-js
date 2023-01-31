export const AuthSetSchema = 'network.xyo.authset'

export interface AuthSet {
  account?: string
  address?: string
  identifier?: string
  issuer?: string
  reAuthenticate?: boolean
  schema: string
  token?: string
}
