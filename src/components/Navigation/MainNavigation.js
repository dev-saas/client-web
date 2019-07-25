import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useAuth, useStyle } from '../../hooks'
import { THEMES } from '../../styles/styles'
const mainNavigation = props => {
  const { t, i18n } = useTranslation()
  const { email, logout } = useAuth()
  const { setTheme } = useStyle()

  const LanguageButton = ({ language, children }) =>
    i18n.language !== language && (
      <NavDropdown.Item onClick={() => i18n.changeLanguage(language)}>
        {children}
      </NavDropdown.Item>
    )

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      sticky='top'>
      <button
        onClick={() => {
          setTheme(THEMES.Light)
        }}>
        Light
      </button>
      <button
        onClick={() => {
          setTheme(THEMES.Dark)
        }}>
        Dark
      </button>
      <Navbar.Brand>{email}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className='mr-auto' />
        <Nav>
          <Nav.Link href='#events'>{t('navigation:Events')}</Nav.Link>
          {email && (
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
          {!email && (
            <Nav.Link href='#auth'>
              {t('navigation:Authenticate')}
            </Nav.Link>
          )}
          <NavDropdown title='Language' id='collasible-nav-dropdown'>
            <LanguageButton language='en-US'>en</LanguageButton>
            <LanguageButton language='pt-BR'>pt</LanguageButton>
            <LanguageButton language='es-ES'>es</LanguageButton>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default mainNavigation
