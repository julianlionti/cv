import { Typography, Collapse, Chip, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useUserAndSkills } from '../../hooks/useUserAndSkills'
import { useLang } from '../../translate'
import Section from '../Section'

const Profile = () => {
  const [showMore, setShowMore] = useState(false)
  const { t } = useLang()
  const { profile, detailProfile, profileTags } = useUserAndSkills()

  const classes = useClasses()
  return (
    <Section
      noBackground
      title={t.profile}
      expanded={showMore}
      onMore={() => setShowMore((e) => !e)}>
      <Typography paragraph variant="body1">
        {profile}
      </Typography>
      <Collapse in={showMore} timeout={500}>
        {detailProfile.split('\n').map((text) => (
          <Typography paragraph variant="body1" key={text}>
            {text}
          </Typography>
        ))}
      </Collapse>
      <div className={classes.chips}>
        {profileTags.map((tag) => (
          <Chip color="primary" label={tag} key={tag} className={classes.chip} />
        ))}
      </div>
    </Section>
  )
}

const useClasses = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

export default Profile
