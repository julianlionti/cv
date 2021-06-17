import { useLang } from '../translate'

type SkillsLangs = 'React' | 'React-Native' | 'NodeJs' | 'TypeScript' | 'JavaScript' | 'MongoDB'

interface ExperienceProps {
  date: string
  title: string
  description: { en: string; es: string }
  icon: 'settings_cell' | 'computer' | 'important_devices'
}
export type FinalExperience = Omit<ExperienceProps, 'description'> & { description: string }

interface UserProps {
  name: string
  bornDate: Date
  contact: {
    phone: string
    mail: string
  }
  position: { en: string; es: string }
  profile: { en: string; es: string }
  profileTags: string[]
  detailProfile: { en: string; es: string }
  experience: ExperienceProps[]
  skills: { title: SkillsLangs; knowledge: number }[]
}

const userAndSkills: UserProps = {
  name: 'Julián Patricio Lionti',
  bornDate: new Date(1988, 10, 18),
  contact: {
    phone: '1136810998',
    mail: 'julianlionti@hotmail.com',
  },
  position: { en: 'FullStack Developer', es: 'Desarrollador FullStack' },
  profile: {
    es: '¡Hola! Mi nombre es Julián Lionti soy desarrollador FullStack desde el año 2011. He trabajado en distintas tecnologías, entre ellas, C#, PHP, Java, Swift pero en los últimos 4 años me dediqué al mundo Javascript. Hoy en día me concentro en NodeJs y React.',
    en: "Hi! My name is Julián Lionti, i'm a FullStack Developer since 2011. I've worked in different technologies, including C #, PHP, Java, Swift but in the last 4 years I have dedicated myself to the Javascript world. Today I focus on NodeJs and React",
  },
  profileTags: ['C#', 'PHP', 'SQL', 'Java', 'Swift', 'JavaScript', 'React', 'NodeJS', 'MongoDB'],
  detailProfile: {
    es: 'En cuanto a base de datos. Los primeros años, junto con C#, trabajé con SQL alrededor de 5 años. A medida que fui migrando a NodeJs también cambié la base de datos y decidí usar MongoDB. Por lo que actualmente me encuentro trabajando en base de datos NoSql.\nCuento con experiencia haciendo aplicaciones tanto para Android como para iOS. En un primer momento utilizaba Java (android) y Swift (iOS) y actualmente utilizo React Native.',
    en: 'As for database. The first years, along with C#, I worked with SQL for about 5 years. As I was migrating to NodeJs I also changed the database and decided to use MongoDB. So I am currently working on NoSql databases\nI have experience making applications for both Android and iOS. At first I used Java (android) and Swift (iOS) and now I use React Native.',
  },
  experience: [
    {
      date: '4/2007 - 01/2013',
      title: 'Claros Instrumental',
      icon: 'computer',
      description: {
        es: 'Puesto: Programador administrativo.\nTareas desarrolladas: Desarrollo y mantenimiento de la Página Web, programación de sistemas internos.',
        en: 'Position: Administrative programmer.\n Developed tasks: Development and maintenance of the Website, programming of internal systems.',
      },
    },
    {
      date: '2012',
      title: 'Racing Club',
      icon: 'settings_cell',
      description: {
        es: 'Creador de la aplicación oficial de Racing Club para Blackberry y Android.',
        en: 'Creator of the official Racing Club application for Blackberry and Android.',
      },
    },
    {
      date: `04/2019 - 06/2020`,
      title: 'Fidus',
      icon: 'settings_cell',
      description: {
        es: 'Desarrollo de la aplicacion Fidus para Android y iOS. React Native',
        en: 'Programming Fidus aplicattion in React Native for Android and iOS',
      },
    },
    {
      date: `07/2020 - 01/2021`,
      icon: 'computer',
      title: 'Pucara',
      description: {
        es: 'Desarrollo frontend del sistema de seguridad Zuthaka',
        en: 'Frontend development of Zuthaka system',
      },
    },
    {
      date: `02/2013 - ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      title: 'Ministerio de Agricultura, Ganadería y Pesca',
      icon: 'important_devices',
      description: {
        es: 'Tareas desarrolladas: Programación de todo tipo de sistemas informativos y aplicaciones de uso general de usos internos y externos.',
        en: 'Developed tasks: Programming of all types of information systems and general use applications for internal and external uses.',
      },
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
}

export const useUserAndSkills = () => {
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
  }
}
