import gql from 'graphql-tag'
import { useQuery, usePagination } from './'

const bookingsQuery = gql`
  query($page: PageInput) {
    getBookings(page: $page) {
      pageInfo {
        hasNextPage
        cursor
      }
      edges {
        _id
        createdAt
        event {
          _id
          title
          date
          price
        }
      }
    }
  }
`

export default function useBookings () {
  const [query, loading] = useQuery(bookingsQuery)
  const { page, setPageInfo } = usePagination()

  const fetchBookings = async () => {
    const { getBookings } = await query(page())

    if (!getBookings.edges[0]) return []

    setPageInfo(getBookings.pageInfo)

    return getBookings.edges
  }

  return [fetchBookings, loading]
}
