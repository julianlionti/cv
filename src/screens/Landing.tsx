import React from 'react'
import { Card, Container, makeStyles, Fade } from '@material-ui/core'
import PersonInfo from '../components/sections/PersonInfo'
import Profile from '../components/sections/Profile'
import Section from '../components/Section'
import InnerRight from '../components/InnerRight'
import WorkExperience from '../components/sections/WorkExperience'

const Landing = () => {
  const classes = useClasses()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Fade timeout={1000} in>
        <Card variant="outlined">
          <PersonInfo />
          <Profile />
          <Section right={<InnerRight />}>
            <WorkExperience />
          </Section>
        </Card>
      </Fade>
    </Container>
  )
}

const useClasses = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
}))

export default Landing
