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
