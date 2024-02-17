import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ButtonEx, ButtonExProps } from '@xylabs/react-button'
import { lazy, Suspense, useState } from 'react'
import type { ReactJsonViewProps } from 'react-json-view'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export interface JsonViewerButtonProps extends ButtonExProps {
  jsonViewProps?: Partial<ReactJsonViewProps>
  src: object
}

export const JsonViewerButton: React.FC<JsonViewerButtonProps> = ({ jsonViewProps, src, title, ...props }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ButtonEx onClick={() => setOpen(!open)} {...props}>
        JSON
      </ButtonEx>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {title ?
          <DialogTitle>{title}</DialogTitle>
        : null}
        <DialogContent>
          <Suspense fallback={<div />}>
            <JsonView src={src} {...jsonViewProps} />
          </Suspense>
        </DialogContent>
        <DialogActions>
          <ButtonEx onClick={() => setOpen(false)}>Close</ButtonEx>
        </DialogActions>
      </Dialog>
    </>
  )
}
