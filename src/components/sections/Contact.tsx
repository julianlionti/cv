import React from 'react'
import { useLang } from '../../translate'
import Section from '../Section'
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg'
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg'
import { ReactComponent as GmailIcon } from '../../assets/icons/gmail.svg'
import { ReactComponent as WhatsappIcon } from '../../assets/icons/whatsapp.svg'
import ContactInfo from '../ContactInfo'

const Contact = () => {
  const { t } = useLang()
  return (
    <Section isChild title={t.contact}>
      <ContactInfo
        Icon={GitHubIcon}
        link={{ href: 'https://github.com/julianlionti', title: 'GitHub' }}
      />
      <ContactInfo
        Icon={LinkedinIcon}
        link={{
          href: 'https://www.linkedin.com/in/julian-patricio-lionti-84122857/',
          title: 'Linkedin',
        }}
      />
      <ContactInfo
        Icon={GmailIcon}
        link={{ href: 'mailto:liclionti@gmail.com', title: 'liclionti@gmail.com' }}
      />
      <ContactInfo
        Icon={WhatsappIcon}
        link={{ href: 'tel:+5491136810998', title: '+54 9 11 3681-0998' }}
      />
    </Section>
  )
}

export default Contact
