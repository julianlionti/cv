import { makeStyles, Fade, IconButton, Tooltip } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { ThemeState } from '../App'
import { useLang } from '../translate'
import { ReactComponent as Argentina } from '../assets/icons/argentina.svg'
import { ReactComponent as Moon } from '../assets/icons/moon.svg'
import { ReactComponent as Sun } from '../assets/icons/sun.svg'
import { ReactComponent as Yanki } from '../assets/icons/eeuu.svg'
import { ReactComponent as PDF } from '../assets/icons/download.svg'
import SwitchIconsBtn from './SwitchIconsBtn'
import { usePdf } from '../utils/usePdf'

interface HeaderProps {
  theme: ThemeState
  onTheme: () => void
  onLoading: (val: boolean) => void
}

const Header = ({ theme, onTheme, onLoading }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(true)
  const { t, lang, setLang } = useLang()
  const classes = useClasses()
  const generate = usePdf()

  const onLang = useCallback(() => {
    setLang((l) => (l === 'es' ? 'en' : 'es'))
  }, [setLang])

  useEffect(() => {
    const scrollListener = () => {
      setShowMenu(window.pageYOffset < 200)
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  const downloadAsPDF = useCallback(() => {
    onLoading(true)
    generate(() => {
      onLoading(false)
    })
    /*
    if (!input) return
    const canvas = await html2canvas(input)
    if (!canvas) return
    var imgData = canvas.toDataURL('image/png')
    downloadjs(imgData, `CV - ${name}.jpg`)*/
  }, [generate, onLoading])

  return (
    <Fade timeout={1500} in={showMenu}>
      <div className={classes.root}>
        <Tooltip title={t.download}>
          <IconButton onClick={downloadAsPDF}>
            <PDF width={32} height={32} />
          </IconButton>
        </Tooltip>
        <SwitchIconsBtn
          tooltip={t.changeLang}
          icons={[
            { in: lang === 'en', Icon: Argentina },
            { in: lang === 'es', Icon: Yanki },
          ]}
          onClick={onLang}
        />
        <SwitchIconsBtn
          tooltip={t.changeTheme}
          icons={[
            { in: theme.id === 'light', Icon: Moon },
            { in: theme.id === 'dark', Icon: Sun },
          ]}
          onClick={onTheme}
          timeout={1000}
        />
      </div>
    </Fade>
  )
}

const useClasses = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: theme.spacing(2),
    display: 'flex',
    top: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(6),
      right: theme.spacing(4),
    },
  },
}))

export default Header
