/* eslint-disable indent */

import { useState } from 'react'
import {
  removeFromArrayById,
  updateInArray,
  findInArrayById
} from '../helper/array-utils'

export default function useList(loadMoreItems) {
  const [list, setList] = useState([])

  const addArray = newItens => setList([...list, ...newItens])

  const add = item => setList([...list, item])

  const remove = id => setList(removeFromArrayById(list, id))

  const get = id => findInArrayById(list, id)

  const update = item => setList(updateInArray(list, item))

  return {
    list,
    addArray,
    remove,
    add,
    get,
    update
  }
}
