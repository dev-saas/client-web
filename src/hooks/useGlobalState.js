import { useContext } from 'react'
import { StateContext } from '../store'

const useGlobalState = () => useContext(StateContext)

export default useGlobalState
