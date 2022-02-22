export function HandleReturnPath() {
  const searchParams = window.location.search
  const params = new URLSearchParams(searchParams)
  const returnPath = params.get('return-path')
  return returnPath || '/'
}
