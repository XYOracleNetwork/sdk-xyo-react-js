export const Bip44 = {
  base: 'm',
  coin_type: {
    /* https://github.com/satoshilabs/slips/blob/master/slip-0044.md */
    bitcoin: "0'",
    bitcoinTestnet: "1'",
    ether: "60'",
    etherClassic: "61'",
  },
  purpose: "44'",
}

export const WalletRootPath = `${Bip44.base}/${Bip44.purpose}/${Bip44.coin_type.ether}`

export const ethereumAccountPath = (index: number, hardened = true) => {
  return `${WalletRootPath}/${index}${hardened ? "'" : ''}/0`
}
