import { useState } from 'react'

export default function usePagination () {
  const [pageInfo, setPageInfo] = useState({})

  const page = (pageSize = 10) => ({
    page: {
      cursor: pageInfo.cursor || null,
      // sort ?
      pageSize
    }
  })

  return {
    setPageInfo,
    page
  }
}
