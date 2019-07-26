export const THEMES = {
  Dark: 'Dark',
  Light: 'Light'
}

const darkPalette = {
  color0: '#506269',
  color1: '#3D5058',
  color2: '#2A3940',
  color3: '#1C333D',
  color4: '#122C37'
}

const lightPallete = {
  color0: '#4D98B8',
  color1: '#2B81A6',
  color2: '#0772A1',
  color3: '#05587C',
  color4: '#034562'
}

const Theme = pallete => ({
  body: {
    backgroundColor: pallete.color0
  },
  navbar: {
    backgroundColor: pallete.color0,
    flexGrow: 1
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '4px'
  },
  paper: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: pallete.color1
  },
  text2: {
    color: pallete.color2
  },
  avatar: {
    margin: '1px',
    backgroundColor: pallete.color2
  },
  recaptcha: {
    margin: '14px 37px 19px',
    display: 'inline-block'
  },
  center: {
    textAlign: 'center'
  }
})

const getStyles = theme => {
  switch (theme) {
    case THEMES.Dark:
      return Theme(darkPalette)
    case THEMES.Light:
      return Theme(lightPallete)
    default:
      throw new Error('Invalid theme')
  }
}

export default getStyles
