import { useEffect } from 'react'

export default function useInfiniteScroll(loadMoreItems) {
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
}
