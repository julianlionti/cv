import React, { useEffect, useState } from 'react'
import './App.css'
import {
  CssBaseline,
  Theme,
  ThemeProvider,
  StylesProvider,
  Backdrop,
  // CircularProgress,
  makeStyles,
} from '@material-ui/core'
import { dark, light } from './utils/Theme'
import Landing from './screens/Landing'
import Menu from './components/Menu'
import { LangProvider } from './translate'
import { esAr } from './translate/es'
import { enUs } from './translate/en'
import { Langs } from 'use-lang'
import ReactGA from 'react-ga'
import check from './assets/animations/writing.json'
import Lottie from 'lottie-react'

const langKey = 'CV-LANG'
const themeKey = 'CV-THEME'

type Themes = 'light' | 'dark'
export type ThemeState = { id: Themes; theme: Theme }

const darkTheme: ThemeState = { id: 'dark', theme: dark }
const lightTheme: ThemeState = { id: 'light', theme: light }

const App = () => {
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<Langs>(() =>
    (localStorage.getItem(langKey) as Langs) || navigator.language.includes('es') ? 'es' : 'en',
  )
  const [theme, setTheme] = useState<ThemeState>(() => {
    const savedValue = (localStorage.getItem(themeKey) || 'light') as Themes
    if (savedValue === 'light') return lightTheme
    return darkTheme
  })

  useEffect(() => {
    ReactGA.initialize('UA-19987090-9')
  }, [])

  const classes = useClasses()

  return (
    <LangProvider
      lang={lang}
      onLang={(newLang) => {
        setLang(newLang)
        localStorage.setItem(langKey, newLang)
      }}
      translations={{ es: esAr, en: enUs }}>
      <ThemeProvider theme={theme.theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Menu
            theme={theme}
            onTheme={() => {
              setTheme((act) => {
                let finalTheme = lightTheme
                if (act.id === 'light') finalTheme = darkTheme
                localStorage.setItem(themeKey, finalTheme.id)

                return finalTheme
              })
            }}
            onLoading={(val) => setLoading(val)}
          />
          <Landing />
          <div style={{ display: 'none' }}>
            <canvas width={1024} height={1024} id="dw-canvas" />
          </div>
          <Backdrop className={classes.backdrop} open={loading}>
            {/* <CircularProgress color="inherit" /> */}
            <Lottie animationData={check} loop={true} autoplay={true} className={classes.check} />
          </Backdrop>
        </StylesProvider>
      </ThemeProvider>
    </LangProvider>
  )
}

const useClasses = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  check: {
    width: 150,
    height: 150,
  },
}))

export default App
