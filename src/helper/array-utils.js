export const updateInArray = (array, updating) => {
  const index = array.findIndex(obj => obj._id === updating._id)
  const newState = [...array]
  newState[index] = updating
  return newState
}
export const findInArrayById = (array, id) =>
  array.find(object => object._id === id)

export const removeFromArrayById = (array, id) =>
  array.filter(object => object._id !== id)

export const addInArray = (array, added) => [...array, ...added]

export const ArrayHelper = array => {
  const update = updating => {
    const index = array.findIndex(obj => obj._id === updating._id)
    if (index === -1) return array
    const newState = [...array]
    newState[index] = updating
    return newState
  }
  const findById = id => array.find(object => object._id === id)

  const removeById = id => array.filter(object => object._id !== id)

  const addMany = added => {
    const toAdd = added.filter(
      item => array.map(a => a._id).indexOf(item._id) === -1
    )
    return [...array, ...toAdd]
  }

  const add = added => (findById(added._id) ? array : [...array, added])

  return { update, findById, removeById, addMany, add }
}
