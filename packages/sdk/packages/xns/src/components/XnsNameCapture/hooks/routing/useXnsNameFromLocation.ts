import { useLocation } from 'react-router-dom'

/**
 * Assumes the user was redirected with a link that contains a username query parameter.
 * @returns The xNS name from the URI username query parameter.
 */
export const useXnsNameFromLocation = (): [name: string | undefined, error: Error | undefined] => {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const rawName = (search.get('xnsname') ?? search.get('name') ?? search.get('username') ?? '').toLowerCase()
  switch (rawName?.split('.').length) {
    case 1: {
      return [rawName, undefined]
    }
    case 2: {
      const rawNameParts = rawName.split('.')
      if (rawNameParts[1] !== 'xyo') {
        return [, new Error('Invalid xNS name [Bad root]')]
      }
      return [rawNameParts[0], undefined]
    }
    default: {
      return [, new Error('Invalid xNS name [Too many parts]')]
    }
  }
}
