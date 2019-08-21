import React, { useState, forwardRef } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { Language } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

export default function LanguageDropdown () {
  const [showMenu, setShowMenu] = useState(false)
  const { i18n } = useTranslation()

  // eslint-disable-next-line react/display-name
  const LanguageButton = forwardRef(({ language, children }, ref) => {
    return (
      i18n.language !== language && (
        <MenuItem
          ref={ref}
          onClick={() => {
            i18n.changeLanguage(language)
            setShowMenu(false)
          }}
        >
          {children}
        </MenuItem>
      )
    )
  })

  return (
    <>
      <IconButton onClick={ev => setShowMenu(ev.currentTarget)}>
        <Language />
      </IconButton>
      {showMenu && (
        <Menu anchorEl={showMenu} open={!!showMenu} onClose={() => setShowMenu(false)}>
          <LanguageButton language="en-US">English</LanguageButton>
          <LanguageButton language="pt-BR">Português</LanguageButton>
          <LanguageButton language="es-ES">Español</LanguageButton>
        </Menu>
      )}
    </>
  )
}
