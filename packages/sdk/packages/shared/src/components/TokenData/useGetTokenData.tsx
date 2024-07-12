import { TokenData } from './TokenData.js'

export const useGetTokenData = (symbols: (string | undefined)[]) => {
  return symbols?.map((symbol) => {
    const additionalTokenData = TokenData.find((x) => x.tokenSymbol === symbol)
    const checkedTokenData = additionalTokenData ?? TokenData[0]
    return checkedTokenData
  })
}
