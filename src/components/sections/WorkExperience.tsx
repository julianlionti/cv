import React, { useState } from 'react'
import Section from '../Section'
import { Fade, Icon } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { FinalExperience, useUserAndSkills } from '../../hooks/useUserAndSkills'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab'
import VisibilitySensor from 'react-visibility-sensor'
import { useLang } from '../../translate'

const TimeLineItem = ({ date, description, title, icon }: FinalExperience) => {
  const [onScreen, setOnScreen] = useState(false)
  return (
    <VisibilitySensor
      delayedCall
      partialVisibility
      onChange={(isVisible) => {
        if (isVisible) setOnScreen(true)
      }}>
      <Fade in={onScreen} timeout={1000}>
        <TimelineItem key={title}>
          <TimelineOppositeContent color="text.secondary">{date}</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <Icon>{icon}</Icon>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              {title}
            </Typography>
            {description.split('\n').map((e) => (
              <Typography key={e} paragraph>
                {e}
              </Typography>
            ))}
          </TimelineContent>
        </TimelineItem>
      </Fade>
    </VisibilitySensor>
  )
}

const WorkExperience = () => {
  const { t } = useLang()
  const { experience } = useUserAndSkills()

  return (
    <Section isChild title={t.workExperience} noDivider>
      <Timeline align="alternate">
        {experience.map((exp) => (
          <TimeLineItem {...exp} />
        ))}
      </Timeline>
    </Section>
  )
}

export default WorkExperience
