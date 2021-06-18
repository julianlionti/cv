import React from 'react'
import { useUserAndSkills } from '../../hooks/useUserAndSkills'
import { useLang } from '../../translate'
import Section from '../Section'
import SkillInfo from '../SkillInfo'

const Languages = () => {
  const { t } = useLang()
  const { languages } = useUserAndSkills()

  return (
    <Section isChild title={t.english}>
      <SkillInfo title={t.reading} knowledge={languages.english.reading} />
      <SkillInfo title={t.writing} knowledge={languages.english.writing} />
      <SkillInfo title={t.oral} knowledge={languages.english.oral} />
    </Section>
  )
}

export default Languages
