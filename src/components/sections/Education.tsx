import { List, ListItem, ListItemText } from '@material-ui/core'

import React from 'react'
import { useUserAndSkills } from '../../hooks/useUserAndSkills'
import { useLang } from '../../translate'
import Section from '../Section'

const Education = () => {
  const { t } = useLang()
  const { studies } = useUserAndSkills()

  return (
    <Section title={t.education}>
      <List dense>
        {studies.map((st) => (
          <ListItem key={st.title}>
            <ListItemText primary={st.title} secondary={`${st.date} - ${st.place}`} />
          </ListItem>
        ))}
      </List>
    </Section>
  )
}

export default Education
