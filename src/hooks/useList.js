/* eslint-disable indent */

import {
  removeFromArrayById,
  updateInArray,
  findInArrayById
} from '../helper/array-utils'

export default function useList(list) {
  const set = newItens => [...list, ...newItens]

  const add = item => [...list, item]

  const remove = id => removeFromArrayById(list, id)

  const get = id => findInArrayById(list, id)

  const update = item => updateInArray(list, item)

  return {
    set,
    remove,
    add,
    get,
    update
  }
}
