import { createMuiTheme } from '@material-ui/core'



export const dark = createMuiTheme({
  palette: {
    mode: 'dark',
    grey: { '200': 'mediumaquamarine' },
  },
})

export const light = createMuiTheme({
  palette: {
    mode: 'light',
  },
})
