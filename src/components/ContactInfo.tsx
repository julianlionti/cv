import { Link, makeStyles } from '@material-ui/core'
import React from 'react'

interface ContactInfoProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  link: { href: string; title: string }
}

const iconSize = { width: 24, height: 24 }
const ContactInfo = ({ Icon, link }: ContactInfoProps) => {
  const classes = useClasses()
  return (
    <div className={classes.root}>
      <Icon {...iconSize} className={classes.icon} />
      {link && (
        <Link
          target={link.href.includes('http') ? '_blank' : undefined}
          rel="noreferrer"
          href={link.href}>
          {link.title}
        </Link>
      )}
    </div>
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
}))

export default ContactInfo
