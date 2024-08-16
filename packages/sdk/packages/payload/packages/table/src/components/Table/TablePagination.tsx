import { FirstPage as FirstPageIcon, KeyboardArrowLeft, KeyboardArrowRight, LastPage as LastPageIcon } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, useTheme } from '@mui/material'
import { useEvent } from '@xyo-network/react-event'
import React from 'react'

import type { PaginationNouns } from './types/index.ts'

export interface TablePaginationActionsProps {
  count: number
  enableNextPage?: boolean
  loading?: boolean
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  page: number
  rowsPerPage: number
}

export function TablePaginationActions({ count, enableNextPage, loading, onPageChange, page, rowsPerPage }: TablePaginationActionsProps) {
  const theme = useTheme()
  const [paginationRef, paginationDispatch] = useEvent<HTMLButtonElement, PaginationNouns>()

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    paginationDispatch('firstPage', 'click', 'true')
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    paginationDispatch('previousPage', 'click', (page - 1)?.toString())
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    paginationDispatch('nextPage', 'click', (page + 1)?.toString())
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    paginationDispatch('lastPage', 'click', 'true')
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <>
      {loading
        ? <CircularProgress size="small" sx={{ height: theme.spacing(2), position: 'absolute', width: theme.spacing(2) }} />
        : null}
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          {theme.direction === 'rtl'
            ? <LastPageIcon />
            : <FirstPageIcon />}
        </IconButton>
        <IconButton ref={paginationRef} onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl'
            ? <KeyboardArrowRight />
            : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          ref={paginationRef}
          onClick={handleNextButtonClick}
          disabled={!enableNextPage && page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl'
            ? <KeyboardArrowLeft />
            : <KeyboardArrowRight />}
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
          {theme.direction === 'rtl'
            ? <FirstPageIcon />
            : <LastPageIcon />}
        </IconButton>
      </Box>
    </>
  )
}
