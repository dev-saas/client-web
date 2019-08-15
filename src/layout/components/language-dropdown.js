import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { Language } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

export default function LanguageDropdown () {
  const [showMenu, setShowMenu] = useState(false)
  const { i18n } = useTranslation()

  function LanguageButton ({ language, children }) {
    return (
      i18n.language !== language && (
        <MenuItem
          onClick={() =>
            i18n.changeLanguage(language) && setShowMenu(false)
          }>
          {children}
        </MenuItem>
      )
    )
  }

  return (
    <>
      <IconButton onClick={ev => setShowMenu(ev.currentTarget)}>
        <Language />
      </IconButton>
      <Menu
        anchorEl={showMenu}
        keepMounted
        open={showMenu}
        onClose={() => setShowMenu(false)}>
        <LanguageButton language="en-US">en</LanguageButton>
        <LanguageButton language="pt-BR">pt</LanguageButton>
        <LanguageButton language="es-ES">es</LanguageButton>
      </Menu>
    </>
  )
}
