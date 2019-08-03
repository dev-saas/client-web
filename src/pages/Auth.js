import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'
import { useRecaptcha, useStyle } from '../hooks'
import { useAuth } from '../hooks/api'
import TextField from '../components/Form/Input'
import { Avatar, Button, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { ButtonLoad } from '../components'
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { login, register, loadingLogin, loadingRegister } = useAuth()
  const {
    recaptchaRef,
    resetRecaptcha,
    handleRecaptcha,
    recaptcha
  } = useRecaptcha()

  return (
    <Container maxWidth='xs'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
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
            function (value) {
              return isLogin || this.parent.password === value
            }
          )
        })}
        onSubmit={async ({ email, password }) => {
          if (isLogin) {
            if (!(await login(email, password))) resetRecaptcha()
          } else {
            setIsLogin(await register(email, password))
            resetRecaptcha()
          }
        }}
        render={({ isValid }) => (
          <div style={styles.paper}>
            <Avatar style={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {t(isLogin ? 'auth:Login' : 'auth:Register')}
            </Typography>
            <Form style={styles.form}>
              <TextField
                variant='outlined'
                margin='normal'
                autoComplete='email'
                fullWidth
                label={t('auth:Email')}
                autoFocus
                id='email'
                name='email'
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='password'
                label={t('auth:Password')}
                type='password'
                id='password'
                autoComplete={
                  isLogin ? 'current-password' : 'new-password'
                }
              />
              {!isLogin && (
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='confirmPassword'
                  label={t('auth:Confirm Password')}
                  type='password'
                  id='confirm-password'
                />
              )}
              <div style={styles.center}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptcha}
                  style={styles.recaptcha}
                />
              </div>
              <ButtonLoad
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={
                  !recaptcha ||
                  !isValid ||
                  loadingLogin ||
                  loadingRegister
                }
                loading={loadingLogin || loadingRegister}>
                {t(isLogin ? 'auth:Login' : 'auth:Register')}
              </ButtonLoad>
              <Button onClick={() => setIsLogin(!isLogin)}>
                {t(
                  isLogin
                    ? 'auth:Dont have an account? Register'
                    : 'auth:Already have an account? Login'
                )}
              </Button>
            </Form>
          </div>
        )}
      />
    </Container>
  )
}

export default AuthPage
