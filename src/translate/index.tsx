import { createLangCtx } from 'use-lang'

export interface LangProps {
  welcome: string
  changeLang: string
  profile: string
  seeMore: string
  contact: string
  workExperience: string
  skills: string
  education: string
  interests: string
  languages: string
  english: string
  writing: string
  reading: string
  oral: string
  download: string
  changeTheme: string
  about: string
}

export const { useLang, LangProvider } = createLangCtx<LangProps>()
