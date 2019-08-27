import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useAuth } from './hooks'
import { Input } from './components/Form'
import { Avatar, Button, Typography, Container } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { ButtonLoad, Paper } from './components'

export function AuthPage () {
  const [isLogin, setIsLogin] = useState(true)
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const {
    login,
    register,
    loading: { loadingFire, loadingRegister },
    sendResetEmail
  } = useAuth()

  return (
    <Container maxWidth="xs">
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          username: ''
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
          ),
          username: string().test(
            'username',
            t('auth:Invalid username'),
            function (value) {
              const regex = RegExp(/^[A-Za-z0-9]*(?:_+)*$/)
              return isLogin || regex.test(value)
            }
          )
        })}
        onSubmit={({ email, password, username }) => {
          if (isLogin) login(email, password)
          else register(email, username, password)
        }}
        render={({ isValid, values }) => (
          <Paper>
            <Avatar
              style={{
                margin: '1px'
              }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t(isLogin ? 'auth:Login' : 'auth:Register')}
            </Typography>
            <Form>
              <Input
                variant="outlined"
                margin="normal"
                autoComplete="email"
                fullWidth
                label={t('auth:Email')}
                autoFocus
                id="email"
                name="email"
              />
              {!isLogin && (
                <Input
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="username"
                  label={t('auth:Username')}
                  type="text"
                  id="username"
                />
              )}
              <Input
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
                <Input
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label={t('auth:Confirm Password')}
                  type="password"
                  id="confirm-password"
                />
              )}
              <ButtonLoad
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid || loadingFire || loadingRegister}
                loading={loadingFire || loadingRegister}
              >
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
                    enqueueSnackbar(t('auth:Email sent'))
                  } catch (err) {
                    enqueueSnackbar(t(err.code), { variant: 'error' })
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
