import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { Input } from '../components/Form'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

import { useAuth, useRecaptcha } from '../hooks'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { t } = useTranslation()

  const { login, register } = useAuth()
  const {
    recaptchaRef,
    resetRecaptcha,
    handleRecaptcha,
    recaptcha
  } = useRecaptcha()

  const switchModeHandler = () => {
    setIsLogin(!isLogin)
    resetRecaptcha()
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={async ({ email, password }) => {
        if (isLogin) {
          if (!(await login(email, password))) resetRecaptcha()
        } else {
          setIsLogin(await register(email, password))
          resetRecaptcha()
        }
      }}
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
            id='email'
            formikKey='email'
            label={t('auth:Email')}
            formikProps={formikProps}
            placeholder={t('auth:Enter your email')}
            type='email'
          />
          <Input
            id='password'
            formikKey='password'
            label={t('auth:Password')}
            placeholder={t('auth:Password')}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            formikProps={formikProps}
            type='password'
          />
          {!isLogin && (
            <Input
              id='confirm-password'
              formikKey='confirmPassword'
              formikProps={formikProps}
              label={t('auth:Confirm Password')}
              placeholder={t('auth:Confirm Password')}
              type='password'
            />
          )}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptcha}
          />
          <Button
            variant='primary'
            type='submit'
            size='lg'
            id='submit'
            block
            disabled={!recaptcha || !formikProps.isValid}>
            {t(isLogin ? 'auth:Login' : 'auth:Signup')}
          </Button>
          <Button
            variant='outline-secondary'
            size='sm'
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
