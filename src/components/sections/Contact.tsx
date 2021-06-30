import React from 'react'
import { useLang } from '../../translate'
import Section from '../Section'
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg'
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg'
import { ReactComponent as GmailIcon } from '../../assets/icons/gmail.svg'
import { ReactComponent as WhatsappIcon } from '../../assets/icons/whatsapp.svg'
import ContactInfo from '../ContactInfo'
import { useUserAndSkills } from '../../hooks/useUserAndSkills'

const insert = (str: string, index: number, value: string) => {
  return str.substr(0, index) + value + str.substr(index)
}
export const toPhone = (phone: string, inser?: boolean) => {
  const parsed = phone.replaceAll(' ', '').replaceAll('-', '')
  if (inser) return insert(parsed, 5, '.')
  return parsed
}

const Contact = () => {
  const { contact } = useUserAndSkills()
  const { t } = useLang()
  return (
    <Section isChild title={t.contact}>
      <ContactInfo Icon={GitHubIcon} link={{ href: contact.github, title: 'GitHub' }} />
      <ContactInfo
        Icon={LinkedinIcon}
        link={{
          href: contact.linkedin,
          title: 'Linkedin',
        }}
      />
      <ContactInfo
        Icon={GmailIcon}
        link={{ href: `mailto:${contact.mail}`, title: contact.mail }}
      />
      <ContactInfo
        Icon={WhatsappIcon}
        link={{ href: `tel:${toPhone(contact.phone)}`, title: '+54 9 11 3681-0998' }}
      />
    </Section>
  )
}

export default Contact
