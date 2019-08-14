import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useRecaptcha } from './hooks'
import { useAuth } from '../actions'
import TextField from './components/Form/Input'
import { Avatar, Button, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { ButtonLoad, Paper } from './components'

export default function AuthPage () {
  const [isLogin, setIsLogin] = useState(true)
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const { login, register, loading, sendResetEmail } = useAuth()
  const {
    recaptchaRef,
    resetRecaptcha,
    handleRecaptcha,
    recaptcha
  } = useRecaptcha()
  return (
    <Container maxWidth="xs">
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
          try {
            await (isLogin
              ? login(email, password)
              : register(email, password))
          } catch (err) {
            enqueueSnackbar(t(`auth:${err.code}`), { variant: 'error' })
          } finally {
            resetRecaptcha()
          }
        }}
        render={({ isValid, values }) => (
          <Paper>
            <Avatar
              style={{
                margin: '1px'
              }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t(isLogin ? 'auth:Login' : 'auth:Register')}
            </Typography>
            <Form>
              <TextField
                variant="outlined"
                margin="normal"
                autoComplete="email"
                fullWidth
                label={t('auth:Email')}
                autoFocus
                id="email"
                name="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label={t('auth:Password')}
                type="password"
                id="password"
                autoComplete={
                  isLogin ? 'current-password' : 'new-password'
                }
              />
              {!isLogin && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label={t('auth:Confirm Password')}
                  type="password"
                  id="confirm-password"
                />
              )}
              <div style={{ textAlign: 'center' }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptcha}
                  style={{
                    margin: '14px 37px 19px',
                    display: 'inline-block'
                  }}
                />
              </div>
              <ButtonLoad
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!recaptcha || !isValid || loading}
                loading={loading}>
                {t(isLogin ? 'auth:Login' : 'auth:Register')}
              </ButtonLoad>
              <Button
                color="primary"
                onClick={() => setIsLogin(!isLogin)}>
                {t(
                  isLogin
                    ? 'auth:Dont have an account? Register'
                    : 'auth:Already have an account? Login'
                )}
              </Button>
              <Button
                color="secondary"
                onClick={async () => {
                  try {
                    await sendResetEmail(values.email)
                    // sendNotification(t('auth:Email sent'))
                  } catch (err) {
                    // sendError(t(`auth:${err.code}`))
                  }
                }}>
                {t('auth:Forgot password')}
              </Button>
            </Form>
          </Paper>
        )}
      />
    </Container>
  )
}
