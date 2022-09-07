export const formatIconHint = (currentAccount?: string | null, reAuthenticate?: boolean) => {
  if (currentAccount || reAuthenticate) {
    // logged in and reAuth is false
    if (currentAccount && !reAuthenticate) {
      return `Signed In as ${currentAccount}`
    }
    // not logged in and reAuth is true
    if (!currentAccount && reAuthenticate) {
      return 'Please login again'
    }
    // not logged in and reAuth is false
    if (!currentAccount && !reAuthenticate) {
      return 'Signed Out'
    }
  } else {
    // if authState isn't present, assume signed out
    return 'Signed Out'
  }
}
