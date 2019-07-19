import React, { useState, useContext, useRef } from 'react'
import { AuthContext, NotificationContext } from '../context'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { Input } from '../components/Form'
import { Error } from '../components'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

import { useGraphQL } from '../hooks'

const AuthPage = props => {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState()
  const { t } = useTranslation()

  const { login, setRecaptcha, recaptcha } = useContext(AuthContext)
  const { query, mutate } = useGraphQL()
  const { sendNotification } = useContext(NotificationContext)
  const recaptchaRef = useRef()

  const switchModeHandler = () => {
    setIsLogin(!isLogin)
    setError()
    recaptchaRef.current.reset()
    setRecaptcha()
  }

  const submitHandler = async values => {
    setError()
    const loginQuery = `
      query ($email: Email!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `
    const createMutation = `
      mutation ($email: Email!, $password: String!) {
        createUser(email: $email, password: $password) {
          _id
          email
        }
      }
    `

    try {
      if (isLogin) {
        const data = await query({ query: loginQuery, variables: values })
        login(data.login.token)
      } else {
        const data = await mutate({
          mutation: createMutation,
          variables: values
        })
        const { email } = data.createUser
        sendNotification(email + ' ' + t('auth:registered successfully'))
        values.password = ''
        setIsLogin(true)
      }
    } catch (err) {
      recaptchaRef.current.reset()
      setRecaptcha(false)
      console.log(err)
    }
  }

  const handleCaptchaResponseChange = token => {
    setRecaptcha(token)
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={submitHandler}
      validationSchema={object().shape({
        email: string()
          .email('Email not valid')
          .required(t('auth:Email is required')),
        password: string()
          .min(3, 'Minimum length is 3')
          .required(t('auth:Password is required')),
        confirmPassword: string().test(
          'passwords-match',
          t('auth:Passwords must match'),
          function(value) {
            return isLogin || this.parent.password === value
          }
        )
      })}>
      {formikProps => (
        <Form>
          <Input
            id="email"
            formikKey="email"
            label={t('auth:Email')}
            formikProps={formikProps}
            placeholder={t('auth:Enter your email')}
            type="email"
          />
          <Input
            id="password"
            formikKey="password"
            label={t('auth:Password')}
            placeholder={t('auth:Password')}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            formikProps={formikProps}
            type="password"
          />
          {!isLogin && (
            <Input
              id="confirm-password"
              formikKey="confirmPassword"
              formikProps={formikProps}
              label={t('auth:Confirm Password')}
              placeholder={t('auth:Confirm Password')}
              type="password"
            />
          )}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaResponseChange}
          />
          <Error message={error} />
          <Button
            variant="primary"
            type="submit"
            size="lg"
            id="submit"
            block
            disabled={!recaptcha}>
            {t(isLogin ? 'auth:Login' : 'auth:Signup')}
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={switchModeHandler}
            block>
            {t(
              isLogin
                ? 'auth:Dont have an account? Register'
                : 'auth:Already have an account? Login'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthPage
