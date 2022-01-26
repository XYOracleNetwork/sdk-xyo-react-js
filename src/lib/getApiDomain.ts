import { isLocalhost } from '@xylabs/sdk-react'

const getApiDomain = () => {
  if (process.env.REACT_APP_API_DOMAIN !== undefined) {
    return process.env.REACT_APP_API_DOMAIN as string
  }
  if (isLocalhost) {
    return 'http://localhost:8080'
  }
  if (location.hostname.startsWith('beta')) {
    return 'https://beta.archivist.xyo.network'
  }
  return 'https://archivist.xyo.network'
}

export { getApiDomain }
