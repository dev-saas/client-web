import React, { useState } from 'react'
import {
  Drawer,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../actions'

export default function MenuDrawer () {
  const [showDrawer, setShowDrawer] = useState(false)
  const { t } = useTranslation()
  const {
    user: { email, logged },
    logout
  } = useAuth()

  const toggleMenu = () => setShowDrawer(!showDrawer)

  return (
    <>
      <IconButton onClick={toggleMenu}>
        <MenuIcon />
      </IconButton>
      <Drawer open={showDrawer} onClick={toggleMenu}>
        {logged && (
          <Button href="/" color="inherit">
            <Typography variant="h6">{email}</Typography>
          </Button>
        )}
        <Button href="feed" color="inherit">
          {t('navigation:Feed')}
        </Button>
        {!logged && (
          <Button href="/auth">{t('navigation:Authenticate')}</Button>
        )}
        {logged && (
          <Button id="logout" onClick={logout}>
            {t('navigation:Logout')}
          </Button>
        )}
      </Drawer>
    </>
  )
}
