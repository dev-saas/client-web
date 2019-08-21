import debounce from 'debounce'

export default function useInfiniteScroll (loadMoreItems) {
  const shouldLoadMoreItems = () =>
    window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight

  const onWindowEvent = () => debounce(shouldLoadMoreItems() && loadMoreItems(), 200)

  window.onscroll = () => onWindowEvent()

  window.onresize = () => onWindowEvent()
}
