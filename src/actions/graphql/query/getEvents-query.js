import gql from 'graphql-tag'
import { useQuery, usePagination } from './'

const eventsQuery = gql`
  query($page: PageInput) {
    getEvents(page: $page) {
      pageInfo {
        hasNextPage
        cursor
      }
      edges {
        _id
        title
        description
        date
        price
        owner {
          uid
          email
        }
      }
    }
  }
`

export default function useEvents () {
  const [query, loading] = useQuery(eventsQuery)
  const { page, setPageInfo } = usePagination()

  const fetchEvents = async () => {
    const { getEvents } = await query(page())

    if (!getEvents.edges[0]) return []

    setPageInfo(getEvents.pageInfo)

    return getEvents.edges
  }

  return [fetchEvents, loading]
}
