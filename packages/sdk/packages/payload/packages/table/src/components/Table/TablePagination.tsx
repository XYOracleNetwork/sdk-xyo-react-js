import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { Box, CircularProgress, IconButton, useTheme } from '@mui/material'
import { useXyoEvent } from '@xyo-network/react-event'

import { PaginationNouns } from './types'

interface TablePaginationActionsProps {
  count: number
  enableNextPage?: boolean
  page: number
  rowsPerPage: number
  loading?: boolean
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

export function TablePaginationActions({ count, page, rowsPerPage, onPageChange, enableNextPage, loading }: TablePaginationActionsProps) {
  const theme = useTheme()
  const [paginationRef, paginationDispatch] = useXyoEvent<HTMLButtonElement, PaginationNouns>()

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
      {loading ? <CircularProgress size={'small'} sx={{ height: theme.spacing(2), position: 'absolute', width: theme.spacing(2) }} /> : null}
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton ref={paginationRef} onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          ref={paginationRef}
          onClick={handleNextButtonClick}
          disabled={!enableNextPage && page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    </>
  )
}
