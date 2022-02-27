import { ButtonEx, ErrorDialog, FlexCol, FlexRow, useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { lazy, Suspense, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export interface JsonFromPromiseProps {
  callback: () => Promise<object>
}

const JsonRouteWrapper: React.FC<JsonFromPromiseProps> = ({ callback, children, ...JsonViewProps }) => {
  const [apiResponse, setApiResponse] = useState<object>()
  const [apiError, setApiError] = useState<AxiosError>()
  const [searchParams, setSearchParams] = useSearchParams()
  const active = searchParams.get('json') === 'true'

  useAsyncEffect(async () => {
    try {
      const response = await callback()
      setApiResponse(response)
    } catch (err) {
      setApiError(err as AxiosError)
    }
  }, [])

  if (active) {
    return (
      <>
        <Suspense fallback={<FlexCol />}>
          {apiResponse && <JsonView src={apiResponse} collapseStringsAfterLength={64} {...JsonViewProps} />}
        </Suspense>
        <FlexRow marginY={3}>
          <ButtonEx flexDirection="row" variant="outlined" onClick={() => setSearchParams({ json: '' })}>
            Back
          </ButtonEx>
        </FlexRow>
        <ErrorDialog
          title="Error Fetching JSON"
          error={apiError}
          open={!!apiError}
          onAction={() => setApiError(undefined)}
        />
      </>
    )
  } else {
    return <>{children}</>
  }
}

export { JsonRouteWrapper }
