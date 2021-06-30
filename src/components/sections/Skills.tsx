import React from 'react'
import { useLang } from '../../translate'
import Section from '../Section'
import SkillInfo from '../SkillInfo'

import { ReactComponent as ReactIcon } from '../../assets/icons/react2.svg'
import { ReactComponent as NodeJsIcon } from '../../assets/icons/nodejs.svg'
import { ReactComponent as JsIcon } from '../../assets/icons/javascript.svg'
import { ReactComponent as MongoIcon } from '../../assets/icons/mongodb.svg'
import { ReactComponent as TsIcon } from '../../assets/icons/typescript.svg'

import ReactIconPath from '../../assets/icons/react2.svg'
import NodeJsIconPath from '../../assets/icons/nodejs.svg'
import JsIconPath from '../../assets/icons/javascript.svg'
import MongoIconPath from '../../assets/icons/mongodb.svg'
import TsIconPath from '../../assets/icons/typescript.svg'

import { useUserAndSkills } from '../../hooks/useUserAndSkills'

export const getSkillIconPath = (e: { title: string }) => {
  switch (e.title) {
    case 'React':
      return ReactIconPath
    case 'NodeJs':
      return NodeJsIconPath
    case 'JavaScript':
      return JsIconPath
    case 'MongoDB':
      return MongoIconPath
    case 'TypeScript':
      return TsIconPath
    default:
      return ReactIconPath
  }
}

const getSkillIcon = (e: { title: string }) => {
  switch (e.title) {
    case 'React':
      return ReactIcon
    case 'NodeJs':
      return NodeJsIcon
    case 'JavaScript':
      return JsIcon
    case 'MongoDB':
      return MongoIcon
    case 'TypeScript':
      return TsIcon
    default:
      return ReactIcon
  }
}

const Skills = () => {
  const { t } = useLang()
  const { skills } = useUserAndSkills()

  return (
    <Section isChild title={t.skills}>
      {skills
        .sort((a, b) => a.knowledge - b.knowledge)
        .map((e) => {
          const finalIcon = getSkillIcon(e)
          return <SkillInfo {...e} Icon={finalIcon} key={e.title} />
        })}
    </Section>
  )
}

export default Skills
