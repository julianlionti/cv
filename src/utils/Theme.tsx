import { createMuiTheme } from '@material-ui/core'

export const dark = createMuiTheme({
  palette: {
    mode: 'dark',
    grey: { '100': 'grey' },
  },
})

export const light = createMuiTheme({
  palette: {
    mode: 'light',
  },
})
