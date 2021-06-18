import { Divider, Grid, Icon, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useLang } from '../translate'

type Props = React.PropsWithChildren<{
  title?: string
  noBackground?: boolean
  onMore?: () => void
  expanded?: boolean
  right?: JSX.Element | boolean
  noDivider?: boolean
  isChild?: boolean
}>

const Section = (props: Props) => {
  const { children, title, noBackground, expanded, onMore, right, noDivider, isChild } = props
  const { t } = useLang()
  const classes = useClasses({ noBackground, expanded, isChild })

  const renderTitle = useCallback(() => {
    if (!title) return null

    return (
      <div className={classes.title}>
        <Typography variant="h6">{title}</Typography>
        {onMore && (
          <Tooltip title={t.seeMore}>
            <IconButton onClick={onMore} className={classes.icon}>
              <Icon>keyboard_arrow_down</Icon>
            </IconButton>
          </Tooltip>
        )}
      </div>
    )
  }, [title, classes, onMore, t])

  const renderLeft = useCallback(() => {
    return (
      <Grid item className={classes.pane} md={right ? 8 : 12} xs={12}>
        {renderTitle()}
        {children}
      </Grid>
    )
  }, [classes, children, right, renderTitle])

  const renderRight = useCallback(() => {
    if (!right) return null

    return (
      <Grid item className={`${classes.pane} ${classes.right}`} md={4} xs={12}>
        {right === true ? <div /> : right}
      </Grid>
    )
  }, [classes, right])

  return (
    <div>
      <Grid container>
        {renderLeft()}
        {renderRight()}
      </Grid>
      {!noDivider && <Divider />}
    </div>
  )
}

type StyleProps = Partial<{ noBackground: boolean; expanded: boolean; isChild: boolean }>
const useClasses = makeStyles((theme) => ({
  pane: ({ isChild }: StyleProps) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(isChild ? 0 : 2),
    paddingRight: theme.spacing(isChild ? 0 : 2),
  }),
  right: {
    backgroundColor: theme.palette.grey[200],
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  icon: ({ expanded }: StyleProps) => ({
    marginLeft: 'auto',
    transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', { duration: 500 }),
  }),
}))

export default Section
