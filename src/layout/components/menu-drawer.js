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

  return (
    <>
      <IconButton onClick={() => setShowDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={showDrawer} onClick={() => setShowDrawer(false)}>
        <Typography variant="h6">{email}</Typography>
        <Button href="#events" color="inherit">
          {t('navigation:Events')}
        </Button>
        {!logged && (
          <Button href="#auth">{t('navigation:Authenticate')}</Button>
        )}
        {logged && (
          <>
            <Button href="#bookings" color="inherit">
              {t('navigation:Bookings')}
            </Button>
            <div id="logout">
              <Button id="logout" onClick={logout}>
                {t('navigation:Logout')}
              </Button>
            </div>
          </>
        )}
      </Drawer>
    </>
  )
}
