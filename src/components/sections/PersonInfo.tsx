import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core'
import { useUserAndSkills } from '../../hooks/useUserAndSkills'
import Section from '../Section'
import Picture from '../../assets/images/perfil.jpg'

const PersonInfo = () => {
  const { name, position } = useUserAndSkills()
  const classes = useClasses()

  return (
    <Section right>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar} src={Picture} />
        </Grid>
        <Grid item>
          <Typography variant="h4" component="h1">
            {name}
          </Typography>
          <Typography>{position}</Typography>
        </Grid>
      </Grid>
    </Section>
  )
}

const useClasses = makeStyles((theme) => ({
  avatar: {
    height: 96,
    width: 96,
  },
}))

export default PersonInfo
