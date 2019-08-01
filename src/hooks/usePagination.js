import { useState } from 'react'

export default function useInfiniteScroll(loadMoreItems) {
  const [pageInfo, setPageInfo] = useState({})

  const page = (pageSize = 10) => ({
    page: {
      cursor: pageInfo.cursor || null,
      pageSize
    }
  })

  return {
    setPageInfo,
    page
  }
}
