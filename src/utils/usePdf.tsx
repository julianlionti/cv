import jspdf, { TextOptionsLight } from 'jspdf'
import { useCallback, useMemo } from 'react'
import Picture from '../assets/images/perfil2.jpeg'
import Full from '../assets/images/full.png'
import Half from '../assets/images/half.png'
import Empty from '../assets/images/emptygm.png'
import Computer from '../assets/images/computer.png'
import Cell from '../assets/images/cell.png'
import Firma from '../assets/images/firma.png'
import Devices from '../assets/images/devices.png'
import {
  FinalExperience,
  FinalStudies,
  UserAndSkills,
  useUserAndSkills,
} from '../hooks/useUserAndSkills'

import { rgba2hex, wordWrap } from './StringHelpers'
import downloadjs from 'downloadjs'
import { LangProps, useLang } from '../translate'
import { getSkillIconPath } from '../components/sections/Skills'
import { useTheme } from '@material-ui/core'

import GHIcon from '../assets/icons/github.svg'
import WAIcon from '../assets/icons/whatsapp.svg'
import GMIcon from '../assets/icons/gmail.svg'
import LNIcon from '../assets/icons/linkedin.svg'
import { toPhone } from '../components/sections/Contact'

interface CvColors {
  bgColor: string
  grey: string
  primary: string
  secondary: string
  primaryText: string
  secondaryText: string
}

const leftMargin = 6
const pageWidth = 210
const greySectionX = 130
const sepMargin = 5
const lineHeight = 5

const drawBackground = (pdf: jspdf, bgcolor: string, grey: string) => {
  pdf.setFillColor(bgcolor)
  pdf.rect(0, 0, greySectionX, 297, 'F')
  pdf.setFillColor(grey)
  pdf.rect(greySectionX, 0, 80, 297, 'F')
}

const drawTitle = (
  pdf: jspdf,
  color: string,
  text: string,
  y: number,
  x?: number,
  fontSize?: number,
  opts?: TextOptionsLight,
) => {
  for (let i = 0; i < 5; i++) {
    pdf.setTextColor(color)
    pdf.setFontSize(fontSize || 16)
    pdf.text(text, x || leftMargin, y, opts)
  }
  return pdf.getTextDimensions(text, { fontSize: 16 }).h + y + lineHeight
}

const drawInnerText = (
  pdf: jspdf,
  color: string,
  text: string | string[],
  x: number,
  y: number,
) => {
  pdf.setTextColor(color)
  pdf.setFontSize(12)
  pdf.text(text, x, y)
}

const drawSeparator = (pdf: jspdf, y: number, x1: number, x2?: number) => {
  const sepDef = 5
  pdf.setDrawColor('#e0e0e0')
  pdf.setLineWidth(0.5)
  let lastY = y + sepMargin
  pdf.line(x1 + ((x1 && x2 && sepDef) || 0), lastY, x2 || pageWidth - sepDef, lastY)
  return lastY + sepMargin * 1.5
}

const drawStars = (pdf: jspdf, y: number, total: number) => {
  for (let i = 0; i < 5; i++) {
    const cuentaRara = (total / (i + 1)) * 0.5
    const star = cuentaRara > 0.4 && cuentaRara < 0.5 ? Half : cuentaRara >= 0.5 ? Full : null
    if (star) pdf.addImage(star, 'PNG', 173 + i * 6.5, y, 4.5, 4.5, star, 'FAST')
  }

  for (let i = 0; i < 5; i++) {
    pdf.addImage(Empty, 'PNG', 173 + i * 6.5, y, 4.5, 4.5, 'empty', 'FAST')
  }
}

const drawHab = async (
  pdf: jspdf,
  textColor: string,
  x: number,
  y: number,
  image: string | null,
  title: string,
  knowledge: number,
) => {
  const getSize = () => {
    switch (title) {
      case 'NodeJs':
        return 24
      case 'MongoDB':
        return 20
      case 'JavaScript':
      case 'TypeScript':
        return 24
      default:
        return 10
    }
  }

  if (image) {
    const img = await loadImage(image)
    pdf.addImage(
      img,
      'PNG',
      title === 'MongoDB' ? x - 2 : x,
      title === 'MongoDB' ? y - 3 : y - 5,
      getSize(),
      getSize(),
      title,
      'FAST',
    )
  }

  pdf.setFontSize(12)
  pdf.setTextColor(textColor)
  pdf.text(title, x + (image ? 10 : 0), y)
  drawStars(pdf, y - 4.3, knowledge)
  return y + pdf.getTextDimensions(title, { fontSize: 12 }).h + lineHeight
}

const loadImage = (path: string): Promise<string> =>
  new Promise((res) => {
    const canvas = document.getElementById('dw-canvas') as HTMLCanvasElement | null
    if (!canvas) throw Error('No se pudo completar el render')

    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    var img = new Image()
    img.onload = () => {
      ctx?.drawImage(img, 0, 0)
      res(canvas.toDataURL('image/png'))
    }
    img.src = path
  })

const drawPersonalInfo =
  () => (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { bgColor, primaryText, secondaryText } = colors
    const { name, position } = userAndSkills
    const perfilWidth = 79.95
    const perfilheight = 60

    pdf.addImage(Picture, 'JPEG', -20, -5, perfilWidth, perfilheight, t.profile, 'FAST')

    pdf.setLineWidth(39)
    pdf.setDrawColor(bgColor)
    pdf.circle(20.5, 20.5, 35, 'S')

    pdf.setFillColor(bgColor)
    pdf.setFontSize(20)
    pdf.setTextColor(primaryText)
    pdf.text(name, 40, 18)

    pdf.setTextColor(secondaryText)
    pdf.setFontSize(12)
    pdf.text(position, 40, 24)
  }

const drawProfile =
  () => (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { primaryText, secondaryText, primary, bgColor, secondary, grey } = colors
    const { profile, detailProfile, profileTags } = userAndSkills

    pdf.setLineWidth(0.5)
    pdf.setDrawColor(grey)
    pdf.setFillColor(bgColor)
    pdf.rect(-10, 40, pageWidth + 20, 92, 'FD')

    drawTitle(pdf, primaryText, t.profile, 48)
    drawInnerText(pdf, secondaryText, wordWrap(profile, 106), leftMargin, 56)
    const [par1, par2] = detailProfile.split('\n')
    drawInnerText(pdf, secondaryText, wordWrap(par1, 96), leftMargin, 74)
    drawInnerText(pdf, secondaryText, wordWrap(par2, 96), leftMargin, 92)

    const drawChip = (x: number, y: number, text: string) => {
      let fillColor = primary
      if (text.includes('Redux') || text.includes('Formik')) {
        fillColor = secondary
      }
      const textWith = pdf.getTextWidth(text)
      const width = 10 + textWith
      const finalX = x + width / 2 - textWith / 2
      pdf.setFillColor(fillColor)
      pdf.roundedRect(x, y, width, 9, 4, 4, 'F')
      pdf.setFontSize(11)
      pdf.setTextColor('#FFF')
      pdf.text(text, finalX, y + 5.8)
      return x + width
    }

    let lastX = leftMargin
    for (let i = 0; i < profileTags.length; i++) {
      const lastY = i < 8 ? 107 : 119
      lastX = drawChip(lastX + 2, lastY, profileTags[i])
      if (i === 7) lastX = leftMargin
    }
  }

const drawSkills =
  (x: number, y: number) =>
  async (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { primaryText } = colors
    const { skills } = userAndSkills

    let lastY = y
    lastY = drawTitle(pdf, primaryText, t.skills, lastY, x)

    const total = skills.length
    for await (const skill of skills) {
      const index = skills.indexOf(skill)
      const finalIcon = getSkillIconPath(skill)
      if (total - 1 === index) {
        await drawHab(pdf, primaryText, x, lastY, finalIcon, skill.title, skill.knowledge)
      } else {
        lastY = await drawHab(pdf, primaryText, x, lastY, finalIcon, skill.title, skill.knowledge)
      }
    }

    return drawSeparator(pdf, lastY, x)
  }

const drawContacts =
  (x: number, y: number) =>
  async (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { primaryText } = colors
    const { contact } = userAndSkills

    const drawContact = async (
      cy: number,
      image: string,
      title: string,
      url: string,
      size?: number,
    ) => {
      const img = await loadImage(image)
      pdf.addImage(img, 'PNG', x, cy - 4.5, size || 6, size || 6, title, 'FAST') // 4
      pdf.setFontSize(12)
      pdf.setTextColor(primaryText)
      if (title === contact.phone) {
        pdf.text(title, x + 10, cy)
      } else {
        pdf.textWithLink(title, x + 10, cy, { url }) //9
      }
      return cy + pdf.getTextDimensions(title, { fontSize: 12 }).h + lineHeight
    }

    let lastY = y
    lastY = drawTitle(pdf, primaryText, t.contact, y, x)
    lastY = await drawContact(lastY, GHIcon, 'Github', contact.github)
    lastY = await drawContact(lastY, LNIcon, 'Linkedin', contact.linkedin)
    lastY = await drawContact(lastY, GMIcon, contact.mail, `mailto:${contact.mail}`)
    await drawContact(lastY, WAIcon, contact.phone, `tel:${toPhone(contact.phone, true)}`)

    return drawSeparator(pdf, lastY, x)
  }

const drawLanguages =
  (x: number, y: number) =>
  async (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { primaryText } = colors
    const { languages } = userAndSkills

    let lastY = y
    lastY = drawTitle(pdf, primaryText, t.english, lastY, x)
    lastY = await drawHab(pdf, primaryText, x, lastY, null, t.reading, languages.english.reading)
    lastY = await drawHab(pdf, primaryText, x, lastY, null, t.writing, languages.english.writing)
    lastY = await drawHab(pdf, primaryText, x, lastY, null, t.oral, languages.english.oral)
    return lastY
  }

const drawExperience =
  (y: number) =>
  async (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { primaryText, secondary, bgColor, grey, secondaryText } = colors
    const { experience } = userAndSkills

    const drawWork = (y: number, exp: FinalExperience, index: number) => {
      const getIcon = () => {
        switch (exp.icon) {
          case 'computer':
            return Computer
          case 'important_devices':
            return Devices
          default:
            return Cell
        }
      }

      const isLeft = index % 2 === 0
      const radio = 6
      const middleX = greySectionX / 2
      const textMargins = 3
      const leftTextX = isLeft ? middleX - radio - textMargins : middleX + radio + textMargins
      const rightTextX = !isLeft ? middleX - radio - textMargins : middleX + radio + textMargins

      pdf.setFontSize(11)
      pdf.setTextColor(secondaryText)
      pdf.text(exp.date, leftTextX, y, { align: isLeft ? 'right' : 'left' })

      const wrappedTitle = wordWrap(exp.title, 30)
      let finalY =
        drawTitle(pdf, primaryText, wrappedTitle, y, rightTextX, 14, {
          align: !isLeft ? 'right' : 'left',
        }) - 5

      if (exp.title.includes('Jefatura') || exp.title.includes('Ministerio')) {
        finalY = finalY + 7
      }

      const wrappedDesc = wordWrap(exp.description, 30)
      pdf.setFontSize(11)
      pdf.setTextColor(secondaryText)
      pdf.text(wrappedDesc, rightTextX, finalY, {
        align: !isLeft ? 'right' : 'left',
      })
      finalY = finalY + wrappedDesc.split('\n').length * pdf.getTextDimensions(wrappedDesc).h + 5

      finalY =
        drawTitle(
          pdf,
          primaryText,
          wordWrap(`${t.techs}${exp.techs.join(', ')}`, 27),
          finalY,
          rightTextX,
          13,
          {
            align: !isLeft ? 'right' : 'left',
          },
        ) + 2.5

      pdf.setFillColor(secondary)
      pdf.setDrawColor(grey)
      pdf.line(middleX, y, middleX, finalY)
      pdf.circle(middleX, y, radio, 'FD')
      pdf.addImage(getIcon(), middleX - radio / 2, y - radio / 2, 6, 6, exp.icon, 'FAST')

      return finalY
    }

    let lastY = y
    lastY = drawTitle(pdf, primaryText, t.workExperience, lastY)

    const finalExperience = experience.reverse()
    for (let i = 0; i < finalExperience.length; i++) {
      lastY = drawWork(lastY, finalExperience[i], i)
      if (i === 2) {
        lastY = 10
        createDividedPage(pdf, bgColor, grey)
      }
    }
  }

const drawEducation =
  (lastY: number) =>
  async (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { primaryText, secondaryText, bgColor } = colors
    const { studies } = userAndSkills
    lastY = lastY - 25

    // createDividedPage(pdf, bgColor, grey)
    pdf.setFillColor(bgColor)
    pdf.rect(-10, lastY, pageWidth + 20, 62, 'FD')

    let x = leftMargin
    lastY = lastY + 8
    lastY = drawTitle(pdf, primaryText, t.education, lastY, x)

    const drawStudy = (sy: number, st: FinalStudies) => {
      for (let i = 0; i < 5; i++) {
        pdf.setFontSize(12)
        pdf.setTextColor(primaryText)
        pdf.text(st.title, x + 5, sy)
      }

      const descY = pdf.getTextDimensions(st.title, { fontSize: 12 }).h + lineHeight + sy - 3
      pdf.setFontSize(11)
      pdf.setTextColor(secondaryText)
      pdf.text(`${st.date} - ${st.place}`, x + 5, descY)

      return descY + 10
    }

    studies.forEach((e) => {
      lastY = drawStudy(lastY, e)
    })

    return lastY + 3
  }

const drawAbout =
  (y: number) =>
  async (pdf: jspdf, colors: CvColors, userAndSkills: UserAndSkills, t: LangProps) => {
    const { primaryText } = colors

    for (let i = 0; i < 10; i++) {
      pdf.setTextColor(primaryText)
      pdf.setFontSize(10)
      pdf.text(wordWrap(t.about, 120), leftMargin, y)
    }

    pdf.addImage(Firma, 'PNG', 100, y + 5, 24, 24, 'Firma', 'FAST')
  }

export const usePdf = () => {
  const userSkills = useUserAndSkills()

  const { t } = useLang()
  const { palette } = useTheme()

  const cvColors: CvColors = useMemo(
    () => ({
      bgColor: palette.background.paper,
      grey: palette.grey[200],
      primary: palette.primary.main,
      secondary: palette.secondary.main,
      primaryText: rgba2hex(palette.text.primary),
      secondaryText: rgba2hex(palette.text.secondary),
    }),
    [palette],
  )

  const generate = useCallback(
    async (onFinished: () => void) => {
      const { bgColor, grey } = cvColors
      const { name } = userSkills
      const pdf = new jspdf('p', 'mm', 'a4', true)
      pdf.setProperties({
        title: `CV - ${name}`,
        subject: t.about,
        author: 'Julián Lionti',
        keywords: 'cv, julian Lionti,generated, javascript,typescript, react',
        creator: 'Julián Lionti',
      })

      const middle = async (fn: any) => fn(pdf, cvColors, userSkills, t)

      // pdf.addFileToVFS('Roboto-monospace.ttf', base64Font)
      // pdf.addFont('Roboto-monospace.ttf', 'Roboto', 'monospace')

      drawBackground(pdf, bgColor, grey)

      middle(drawPersonalInfo())
      middle(drawProfile())

      let belowProfileY = 140
      let lastY = belowProfileY
      let greyMargin = leftMargin + greySectionX

      lastY = await middle(drawSkills(greyMargin, lastY))
      lastY = await middle(drawContacts(greyMargin, lastY))
      lastY = await middle(drawLanguages(greyMargin, lastY))

      lastY = belowProfileY
      await middle(drawExperience(lastY))
      lastY = await middle(drawEducation(lastY))
      middle(drawAbout(lastY))

      onFinished()
      pdf.output('dataurlnewwindow')
      // downloadjs(pdf.output('blob'), `CV - ${name}.pdf`)
    },
    [cvColors, userSkills, t],
  )

  return generate
}
function createDividedPage(pdf: jspdf, bgColor: string, grey: string) {
  pdf.addPage()
  drawBackground(pdf, bgColor, grey)

  pdf.setLineWidth(0.5)
  pdf.setDrawColor(grey)
}
