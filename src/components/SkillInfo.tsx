import { makeStyles, Rating, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { SVGIcon } from './ContactInfo'

interface Props {
  title: string
  knowledge: number
  Icon?: SVGIcon
}

const iconSize = { width: 24, height: 24 }
const SkillInfo = ({ Icon, knowledge, title }: Props) => {
  const [onScreen, setOnScreen] = useState(false)
  const [rating, setRating] = useState(0)
  const classes = useClasses()

  useEffect(() => {
    if (onScreen) {
      const times = 10
      let actual = 0
      const diff = knowledge / times
      const interval = setInterval(() => {
        setRating((act) => act + diff)
        if (times - 1 === actual) {
          clearInterval(interval)
        }
        actual++
      }, 100)
    }
  }, [onScreen, knowledge])

  return (
    <VisibilitySensor
      onChange={(isVisible) => {
        if (isVisible) setOnScreen(true)
      }}>
      <div className={classes.root}>
        {Icon && <Icon {...iconSize} className={classes.icon} />}
        <Typography className={classes.title}>{title}</Typography>
        <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
      </div>
    </VisibilitySensor>
  )
}

const useClasses = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
  title: {
    flex: 1,
  },
}))

export default SkillInfo
