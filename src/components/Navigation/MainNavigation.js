import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useStyle } from '../../hooks'
import { useAuth } from '../../hooks/api'
import { THEMES } from '../../styles/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TranslateIcon from '@material-ui/icons/Language'
import BrightnessLow from '@material-ui/icons/InvertColors'
import BrightnessHigh from '@material-ui/icons/InvertColorsOff'

const mainNavigation = props => {
  const { t, i18n } = useTranslation()
  const {
    user: { email, logged },
    logout
  } = useAuth()
  const { setTheme, theme, styles } = useStyle()
  const [showDrawer, setShowDrawer] = useState(false)

  const LanguageButton = ({ language, children }) =>
    i18n.language !== language && (
      <MenuItem
        onClick={() =>
          i18n.changeLanguage(language) && setShowMenu(false)
        }>
        {children}
      </MenuItem>
    )

  const ThemeButton = ({ them }) =>
    them !== theme && (
      <IconButton style={styles.text2} onClick={() => setTheme(them)}>
        {them === THEMES.Light ? <BrightnessHigh /> : <BrightnessLow />}
      </IconButton>
    )

  const [showMenu, setShowMenu] = useState(false)

  const MenuDropdown = ({ children, ...props }) => (
    <Menu
      anchorEl={showMenu}
      keepMounted
      open={showMenu}
      {...props}
      onClose={() => setShowMenu(false)}>
      {children}
    </Menu>
  )

  return (
    <AppBar style={styles.navbar} position='static'>
      <Toolbar>
        <IconButton
          style={styles.text2}
          onClick={() => setShowDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer open={showDrawer} onClick={() => setShowDrawer(false)}>
          <Typography variant='h6' style={styles.text2}>
            {email}
          </Typography>
          <Button style={styles.text2} href='#events' color='inherit'>
            {t('navigation:Events')}
          </Button>
          {!logged && (
            <Button style={styles.text1} href='#auth'>
              {t('navigation:Authenticate')}
            </Button>
          )}
          {logged && (
            <React.Fragment>
              <Nav.Link href='#bookings'>
                {t('navigation:Bookings')}
              </Nav.Link>
              <Nav.Link href='#bat'>Bat</Nav.Link>
              <div id='logout'>
                <Nav.Link id='logout' onClick={logout}>
                  {t('navigation:Logout')}
                </Nav.Link>
              </div>
            </React.Fragment>
          )}
        </Drawer>
        <ThemeButton them={THEMES.Light} />
        <ThemeButton them={THEMES.Dark} />
        <IconButton
          style={styles.text2}
          onClick={ev => setShowMenu(ev.currentTarget)}>
          <TranslateIcon />
        </IconButton>
        <MenuDropdown>
          <LanguageButton language='en-US'>en</LanguageButton>
          <LanguageButton language='pt-BR'>pt</LanguageButton>
          <LanguageButton language='es-ES'>es</LanguageButton>
        </MenuDropdown>
      </Toolbar>
    </AppBar>
  )
}

export default mainNavigation
