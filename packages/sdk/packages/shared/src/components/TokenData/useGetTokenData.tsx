import { TokenData } from './TokenData.ts'

export const getTokenData = (symbols: (string | undefined)[]) => {
  return symbols?.map((symbol) => {
    const additionalTokenData = TokenData.find(x => x.tokenSymbol.toLowerCase() === symbol?.toLowerCase())
    const checkedTokenData = additionalTokenData ?? {
      coinmarketcapLink: '',
      etherscanLink: '',
      icon: '',
      readableName: 'Unknown Token',
      tokenSymbol: 'unknown',
      uniqueTokenId: 'unknown',
    }
    return checkedTokenData
  })
}
