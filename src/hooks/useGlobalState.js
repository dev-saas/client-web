import { useContext } from 'react'
import { StateContext } from '../reducer'

const useGlobalState = () => useContext(StateContext)

export default useGlobalState
