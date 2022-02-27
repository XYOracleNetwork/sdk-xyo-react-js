import { ErrorDialog, FlexCol, useAsyncEffect } from '@xylabs/sdk-react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { lazy, Suspense, useState } from 'react'
import { ThemeKeys, ThemeObject } from 'react-json-view'
import { useLocation } from 'react-router-dom'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

const sanitizeUrlForApi = (path: string) => {
  if (new RegExp(/json$/g).test(path)) {
    return path.split('json')[0]
  } else {
    return path
  }
}

export interface JsonFromUrlProps {
  apiDomain: string
  pathname?: string
  theme?: ThemeKeys | ThemeObject
}

/* deprecated */
const JsonFromUrl: React.FC<JsonFromUrlProps> = ({ pathname, apiDomain, ...JsonViewProps }) => {
  const location = useLocation()
  const path = pathname ? pathname : location.pathname
  const [apiResponse, setApiResponse] = useState<AxiosResponse>()
  const [apiError, setApiError] = useState<AxiosError>()

  useAsyncEffect(async () => {
    const apiPath = sanitizeUrlForApi(path)
    const url = `${apiDomain}${apiPath}`

    try {
      const response = await axios.get(url)
      setApiResponse(response.data)
    } catch (err) {
      setApiError(err as AxiosError)
    }
  }, [])

  return (
    <>
      <p>Resource - {sanitizeUrlForApi(path)}</p>
      <Suspense fallback={<FlexCol />}>
        {apiResponse && <JsonView src={apiResponse} collapseStringsAfterLength={64} {...JsonViewProps} />}
      </Suspense>
      <ErrorDialog
        title="Error Fetching JSON"
        error={apiError}
        open={!!apiError}
        onAction={() => setApiError(undefined)}
      />
    </>
  )
}

export { JsonFromUrl }
