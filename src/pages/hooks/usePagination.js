import { useState, useEffect } from 'react'
import { ArrayHelper } from '../../actions/store/helper/array-utils'

export default function usePagination (connection) {
  const [list, setList] = useState([])
  const [cursor, setCursor] = useState()

  useEffect(
    () => {
      if (!connection) return
      let { edges, pageInfo } = connection
      setList(edges)
      if (edges[0]) setCursor(pageInfo.cursor)
    },
    [connection]
  )

  function update (connection) {
    if (!connection.pageInfo) {
      setList(ArrayHelper(list).add(connection))
      return
    }
    let { edges, pageInfo } = connection
    setList(ArrayHelper(list).addMany(edges))
    if (edges[0]) setCursor(pageInfo.cursor)
  }

  return [list, update, cursor]
}
