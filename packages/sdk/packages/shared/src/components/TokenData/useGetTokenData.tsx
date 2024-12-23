import { TokenData } from './TokenData.ts'

// eslint-disable-next-line @eslint-react/hooks-extra/no-useless-custom-hooks
export const useGetTokenData = (symbols: (string | undefined)[]) => {
  return symbols?.map((symbol) => {
    const additionalTokenData = TokenData.find(x => x.tokenSymbol === symbol)
    const checkedTokenData = additionalTokenData ?? TokenData[0]
    return checkedTokenData
  })
}
