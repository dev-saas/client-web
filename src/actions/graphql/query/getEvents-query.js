import gql from 'graphql-tag'
import { useQuery, usePagination } from './'

export function fetchEvents (selection) {
  const { page, setPageInfo } = usePagination()
  const [query, loading] = useQuery(gql`
  query($page: PageInput) {
    getEvents(page: $page) {
      pageInfo {
        hasNextPage
        cursor
      }
      edges {
        ${selection}
      }
    }
  }
`)

  const fetchEvents = async selection => {
    const { getEvents } = await query(page())

    if (!getEvents.edges[0]) return []

    setPageInfo(getEvents.pageInfo)
    return getEvents.edges
  }

  return [fetchEvents, loading]
}
