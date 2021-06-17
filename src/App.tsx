import React, { useState } from 'react'
import './App.css'
import { CssBaseline, Theme, ThemeProvider, StylesProvider } from '@material-ui/core'
import { dark, light } from './utils/Theme'
import Landing from './screens/Landing'
import Menu from './components/Menu'
import { LangProvider } from './translate'
import { esAr } from './translate/es'
import { enUs } from './translate/en'
import { Langs } from 'use-lang'

const langKey = 'CV-LANG'
const themeKey = 'CV-THEME'

type Themes = 'light' | 'dark'
export type ThemeState = { id: Themes; theme: Theme }

const darkTheme: ThemeState = { id: 'dark', theme: dark }
const lightTheme: ThemeState = { id: 'light', theme: light }

const App = () => {
  const [lang, setLang] = useState<Langs>(() => (localStorage.getItem(langKey) as Langs) || 'es')

  const [theme, setTheme] = useState<ThemeState>(() => {
    const savedValue = (localStorage.getItem(themeKey) || 'light') as Themes
    if (savedValue === 'light') return lightTheme
    return darkTheme
  })

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
          />
          <Landing />
        </StylesProvider>
      </ThemeProvider>
    </LangProvider>
  )
}

export default App
