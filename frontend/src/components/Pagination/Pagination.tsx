import { ChevronLeft, ChevronRight } from '@carbon/icons-react'
import { Button, Flex, FlexProps } from '@chakra-ui/react'

import { getPages } from './utils'

interface Props extends FlexProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ onPageChange, page, totalPages, ...flexProps }: Props) {
  const goToFirstPage = () => onPageChange(1)
  const goToPreviousPage = () => onPageChange(page - 1)
  const goToNextPage = () => onPageChange(page + 1)
  const goToLastPage = () => onPageChange(totalPages)

  const pages = getPages(page, totalPages)

  return (
    <Flex gap={4} {...flexProps}>
      <Button onClick={goToFirstPage} isDisabled={page <= 1}>
        <ChevronLeft style={{ marginRight: '-10px' }} />
        <ChevronLeft />
      </Button>

      <Button onClick={goToPreviousPage} isDisabled={page <= 1}>
        <ChevronLeft />
      </Button>

      {pages.map(p => (
        <Button key={p} onClick={() => onPageChange(p)} bg={p === page ? 'yellow.400' : undefined}>
          {p}
        </Button>
      ))}

      <Button onClick={goToNextPage} isDisabled={page >= totalPages}>
        <ChevronRight />
      </Button>

      <Button onClick={goToLastPage} isDisabled={page >= totalPages}>
        <ChevronRight />
        <ChevronRight style={{ marginLeft: '-10px' }} />
      </Button>
    </Flex>
  )
}
