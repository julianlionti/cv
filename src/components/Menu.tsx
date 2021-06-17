import React from 'react'
import { ThemeState } from '../App'
import { useLang } from '../translate'

interface HeaderProps {
  theme: ThemeState
  onTheme: () => void
}

const Header = ({ theme, onTheme }: HeaderProps) => {
  const { setLang, t } = useLang()
  return (
    <div>
      <button onClick={onTheme}>theme</button>
      <button onClick={() => setLang((l) => (l === 'es' ? 'en' : 'es'))}>{t.changeLang}</button>
    </div>
  )
}

export default Header
