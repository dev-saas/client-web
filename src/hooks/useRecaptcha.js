import { useRef, useState } from 'react'

export default function useRecaptcha() {
  const recaptchaRef = useRef()
  const [recaptcha, setRecaptcha] = useState(false)

  const resetRecaptcha = () => {
    recaptchaRef.current.reset()
    setRecaptcha(false)
    localStorage.removeItem('recaptcha')
  }

  const handleRecaptcha = token => {
    localStorage.setItem('recaptcha', token)
    setRecaptcha(true)
  }

  return {
    resetRecaptcha,
    recaptcha,
    handleRecaptcha,
    recaptchaRef
  }
}
