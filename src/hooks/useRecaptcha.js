import { useContext, useRef } from 'react'
import { AuthContext } from '../context'

export default function useRecaptcha() {
  const { recaptcha, setRecaptcha } = useContext(AuthContext)
  const recaptchaRef = useRef()

  const resetRecaptcha = () => {
    recaptchaRef.current.reset()
    setRecaptcha(false)
  }

  const handleRecaptcha = token => {
    setRecaptcha(token)
  }

  return {
    resetRecaptcha,
    recaptcha,
    handleRecaptcha,
    recaptchaRef
  }
}
