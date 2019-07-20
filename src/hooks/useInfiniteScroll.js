import { useEffect, useState } from 'react'

export default function useInfiniteScroll(loadMoreItems) {
  const [pageInfo, setPageInfo] = useState({})

  const shouldLoadMoreItems = () =>
    window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight

  const onWindowEvent = () => shouldLoadMoreItems() && loadMoreItems()

  useEffect(() => {
    window.addEventListener('scroll', onWindowEvent)
    window.addEventListener('resize', onWindowEvent)
    return () => {
      window.removeEventListener('scroll', onWindowEvent)
      window.removeEventListener('resize', onWindowEvent)
    }
  })

  const page = (pageSize = 10) => ({
    page: {
      cursor: pageInfo.cursor || null,
      pageSize
    }
  })

  useEffect(loadMoreItems, [])

  return {
    setPageInfo,
    page
  }
}
