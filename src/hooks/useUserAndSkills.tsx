import { useLang } from '../translate'

type SkillsLangs = 'React' | 'React-Native' | 'NodeJs' | 'TypeScript' | 'JavaScript' | 'MongoDB'

interface ExperienceProps {
  date: string
  title: string
  description: { en: string; es: string }
  techs: string[]
  icon: 'settings_cell' | 'computer' | 'important_devices'
}
export interface FinalStudies {
  title: string
  date: string
  place: string
}
export type FinalExperience = Omit<ExperienceProps, 'description'> & { description: string }

type LanguageKnwoledge = { writing: number; reading: number; oral: number }
interface UserProps {
  name: string
  bornDate: Date
  contact: {
    phone: string
    mail: string
    linkedin: string
    github: string
  }
  position: { en: string; es: string }
  profile: { en: string; es: string }
  profileTags: string[]
  detailProfile: { en: string; es: string }
  experience: ExperienceProps[]
  skills: { title: SkillsLangs; knowledge: number }[]
  languages: { english: LanguageKnwoledge }
  studies: {
    date: string
    title: { es: string; en: string }
    place: { es: string; en: string }
    detail?: string
  }[]
}

const userAndSkills: UserProps = {
  name: 'Julián Patricio Lionti',
  bornDate: new Date(1988, 10, 18),
  contact: {
    phone: '+54 9 11 3889-8078',
    mail: 'julianlionti@hotmail.com',
    github: 'https://github.com/julianlionti',
    linkedin: 'https://www.linkedin.com/in/julian-patricio-lionti-84122857',
  },
  position: { en: 'FullStack Developer', es: 'Desarrollador FullStack' },
  profile: {
    es: '¡Hola! Mi nombre es Julián Lionti soy desarrollador FullStack desde el año 2011. He trabajado en distintas tecnologías, entre ellas, C#, PHP, Java, Swift pero en los últimos 4 años me dediqué al mundo Javascript. Hoy en día me concentro en NodeJs y React.',
    en: "Hi! My name is Julián Lionti, i'm a FullStack Developer since 2011. I've worked in different technologies, including C #, PHP, Java, Swift but in the last 4 years I have dedicated myself to the Javascript world. Today I focus on NodeJs and React",
  },
  profileTags: [
    'JavaScript',
    'TypeScript',
    'React',
    'NodeJS',
    'MongoDB',
    'C#',
    'PHP',
    'SQL',
    'Java',
    'Swift',
    'Redux',
    'Formik',
  ],
  detailProfile: {
    es: 'En cuanto a base de datos. Los primeros años, junto con C#, trabajé con SQL alrededor de 5 años. A medida que fui migrando a NodeJs también cambié la base de datos y decidí usar MongoDB. Por lo que actualmente me encuentro trabajando en base de datos NoSql.\nCuento con experiencia haciendo aplicaciones tanto para Android como para iOS. En un primer momento utilizaba Java (android) y Swift (iOS) y actualmente utilizo React Native.',
    en: 'As for database. The first years, along with C#, I worked with SQL for about 5 years. As I was migrating to NodeJs I also changed the database and decided to use MongoDB. So I am currently working on NoSql databases\nI have experience making applications for both Android and iOS. At first I used Java (android) and Swift (iOS) and now I use React Native.',
  },
  experience: [
    // {
    //   date: '4/2007 - 01/2013',
    //   title: 'Claros Instrumental',
    //   icon: 'computer',
    //   description: {
    //     es: 'Puesto: Programador administrativo.\nTareas desarrolladas: Desarrollo y mantenimiento de la Página Web, programación de sistemas internos.',
    //     en: 'Position: Administrative programmer.\n Developed tasks: Development and maintenance of the Website, programming of internal systems.',
    //   },
    //   techs: ['Java'],
    // },
    {
      date: '2012',
      title: 'Racing Club',
      icon: 'settings_cell',
      description: {
        es: 'Creador de la aplicación oficial de Racing Club para Blackberry y Android.',
        en: 'Creator of the official Racing Club application for Blackberry and Android.',
      },
      techs: ['Java'],
    },
    {
      date: `04/2019 - 06/2020`,
      title: 'Fidus',
      icon: 'settings_cell',
      description: {
        es: 'Desarrollo de la aplicacion Fidus para Android y iOS. React Native',
        en: 'Programming Fidus aplicattion in React Native for Android and iOS',
      },
      techs: ['React-Native', 'React', 'NodeJS', 'PostgreSQL'],
    },
    {
      date: `07/2020 - 01/2021`,
      icon: 'computer',
      title: 'Pucara',
      description: {
        es: 'Desarrollo frontend del sistema de seguridad Zuthaka',
        en: 'Frontend development of Zuthaka system',
      },
      techs: ['React', 'Typescript'],
    },
    {
      date: `02/2013 - 08/2021`,
      title: 'Ministerio de Agricultura, Ganadería y Pesca',
      icon: 'important_devices',
      description: {
        es: 'Tareas desarrolladas: Programación de todo tipo de sistemas informativos y aplicaciones de uso general de usos internos y externos.',
        en: 'Developed tasks: Programming of all types of information systems and general use applications for internal and external uses.',
      },
      techs: [
        'React',
        'React-Native',
        'NodeJS',
        'MongoDB',
        'Typescript',
        'Java',
        'Swift',
        'C#',
        '.NET',
        'SQL',
      ],
    },
    {
      date: `08/2021 - 10/2021`,
      icon: 'computer',
      title: 'Jefatura de Gabinete de Ministros',
      description: {
        es: 'Responsable del FRONTEND. Desarrollo de un sistema para el ingreso a la planta permanente en el estado',
        en: 'Leader of FRONTEND. We developed a system for citizens to register, add their work experience and apply to a selected job position inside the goverment',
      },
      techs: ['React', 'Typescript'],
    },
    {
      date: `11/2010 - Actualidad`,
      icon: 'computer',
      title: 'Publicis Groupe',
      description: {
        es: 'Desarrollador principalmente frontend',
        en: 'Most of the part working on FRONTEND',
      },
      techs: ['React', 'Typescript', '.NET'],
    },
  ],
  skills: [
    { title: 'React', knowledge: 4.5 },
    { title: 'React-Native', knowledge: 4.5 },
    { title: 'NodeJs', knowledge: 3.5 },
    { title: 'TypeScript', knowledge: 4 },
    { title: 'JavaScript', knowledge: 4.5 },
    { title: 'MongoDB', knowledge: 3.5 },
  ],
  languages: {
    english: { reading: 4, oral: 3, writing: 3 },
  },
  studies: [
    {
      title: {
        es: 'BACHILLER NACIONAL BILINGÜE EN CIENCIAS Y LETRAS',
        en: 'BILINGUAL NATIONAL BACHELOR IN SCIENCES AND LETTERS',
      },
      place: { es: 'Escuela Del Mirador', en: 'Belvedere School' },
      date: '03/2001 - 11/2005',
    },
    {
      title: { es: 'TÉCNICO EN SEGURIDAD E HIGIENE', en: 'SAFETY AND HYGIENE TECHNICIAN' },
      place: { es: 'Instituto Perito Moreno', en: 'Institute Perito Moreno' },
      date: '04/2008 - 12/2011',
    },
    {
      title: { es: 'LICENCIATURA EN SEGURIDAD E HIGIENE', en: 'DEGREE IN SAFETY AND HYGIENE' },
      place: {
        es: 'Universidad Nacional de Lomas de Zamora',
        en: 'National University of Lomas de Zamora',
      },
      date: '04/2012 - 11/2013.',
    },
  ],
}

export interface UserAndSkills {
  name: string
  bornDate: Date
  contact: { phone: string; mail: string; github: string; linkedin: string }
  position: string
  profile: string
  profileTags: string[]
  detailProfile: string
  experience: FinalExperience[]
  skills: { title: SkillsLangs; knowledge: number }[]
  languages: { english: LanguageKnwoledge }
  studies: { title: string; place: string; date: string }[]
}

export const useUserAndSkills = (): UserAndSkills => {
  const { lang } = useLang()
  const finalLang = lang === 'es' ? 'es' : 'en'

  return {
    ...userAndSkills,
    position: userAndSkills.position[finalLang],
    profile: userAndSkills.profile[finalLang],
    detailProfile: userAndSkills.detailProfile[finalLang],
    experience: userAndSkills.experience.map((e) => ({
      ...e,
      description: e.description[finalLang],
    })),
    studies: userAndSkills.studies.map((e) => ({
      ...e,
      place: e.place[finalLang],
      title: e.title[finalLang],
    })),
  }
}
