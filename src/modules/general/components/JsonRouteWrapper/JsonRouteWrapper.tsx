import { ButtonEx, ErrorDialog, FlexBoxProps, FlexCol, FlexRow, useAsyncEffect } from '@xylabs/sdk-react'
import { XyoApiError } from '@xyo-network/sdk-xyo-client-js'
import { lazy, Suspense, useState } from 'react'
import { ReactJsonViewProps } from 'react-json-view'
import { useSearchParams } from 'react-router-dom'

import { JsonApiButton } from './JsonApiButton'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export interface JsonFromPromiseProps extends FlexBoxProps {
  callback: () => Promise<object | undefined>
  noBackButton?: boolean
  noJsonButton?: boolean
  jsonViewProps?: ReactJsonViewProps
}

export const JsonRouteWrapper: React.FC<JsonFromPromiseProps> = ({ callback, children, noBackButton = false, noJsonButton = false, jsonViewProps, ...props }) => {
  const [apiResponse, setApiResponse] = useState<object>()
  const [apiError, setApiError] = useState<XyoApiError>()
  const [searchParams, setSearchParams] = useSearchParams()
  const active = !!searchParams.get('json')

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const response = await callback()
        if (mounted()) {
          setApiResponse(response)
        }
      } catch (ex) {
        if (mounted()) {
          const error = ex as XyoApiError
          if (error.isXyoError) {
            setApiError(error)
          } else {
            throw ex
          }
        }
      }
    },
    [callback]
  )

  return (
    <FlexCol {...props}>
      {active ? (
        <>
          <Suspense fallback={null}>{apiResponse && <JsonView src={apiResponse} collapseStringsAfterLength={64} {...jsonViewProps} />}</Suspense>
          {!noBackButton && (
            <FlexRow marginY={3}>
              <ButtonEx
                flexDirection="row"
                variant="outlined"
                onClick={() => {
                  searchParams.delete('json')
                  setSearchParams(searchParams)
                }}
              >
                Back
              </ButtonEx>
            </FlexRow>
          )}
          <ErrorDialog title="Error Fetching JSON" error={apiError} open={!!apiError} onAction={() => setApiError(undefined)} />
        </>
      ) : (
        <>
          {children}
          {!noJsonButton && <JsonApiButton marginTop={2} />}
        </>
      )}
    </FlexCol>
  )
}
