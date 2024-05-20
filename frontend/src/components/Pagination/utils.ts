// Must be odd number to keep current page in the middle
const NUMBER_OF_PAGES_SHOWN = 5

export const getPages = (page: number, totalPages: number) => {
  const aroundCurrentPage = (NUMBER_OF_PAGES_SHOWN - 1) / 2

  if (totalPages <= NUMBER_OF_PAGES_SHOWN) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (page <= aroundCurrentPage) {
    return Array.from({ length: NUMBER_OF_PAGES_SHOWN }, (_, i) => i + 1)
  }

  if (page >= totalPages - aroundCurrentPage) {
    return Array.from({ length: NUMBER_OF_PAGES_SHOWN }, (_, i) => totalPages - NUMBER_OF_PAGES_SHOWN + i + 1)
  }

  return Array.from({ length: NUMBER_OF_PAGES_SHOWN }, (_, i) => page - aroundCurrentPage + i)
}
