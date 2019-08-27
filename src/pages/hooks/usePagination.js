import { useState, useEffect } from 'react'
import { ArrayHelper } from '../../store/helper/array-utils'

export function usePagination (connection) {
  const [list, setList] = useState([])
  const [cursor, setCursor] = useState()
  const [hasNextPage, setHasNextPage] = useState(true)

  useEffect(
    () => {
      if (!connection) return
      let { nodes, cursor, hasNextPage } = connection
      setList(nodes)
      setHasNextPage(hasNextPage)
      setCursor(cursor)
    },
    [connection]
  )

  function addOne (node) {
    setList(ArrayHelper(list).add(node))
  }

  function update (connection) {
    let { nodes, cursor, hasNextPage } = connection
    setHasNextPage(hasNextPage)
    setList(ArrayHelper(list).addMany(nodes))
    setCursor(cursor)
  }

  return [list, update, cursor, hasNextPage, addOne]
}
