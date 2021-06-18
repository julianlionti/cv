import { Collapse, IconButton, Tooltip } from '@material-ui/core'
import React from 'react'
import { SVGIcon } from './ContactInfo'

interface SwitchIconsBtnProps {
  icons: { in: boolean; Icon: SVGIcon }[]
  onClick: () => void
  timeout?: number
  tooltip: string
}

const flagSize = { width: 32, height: 32 }

const SwitchIconsBtn = ({ icons, onClick, timeout, tooltip }: SwitchIconsBtnProps) => {
  return (
    <div>
      {icons.map((ic, i) => (
        <Collapse key={i} unmountOnExit in={ic.in} timeout={timeout}>
          <Tooltip title={tooltip}>
            <IconButton onClick={onClick}>
              <ic.Icon {...flagSize} />
            </IconButton>
          </Tooltip>
        </Collapse>
      ))}
    </div>
  )
}

export default SwitchIconsBtn
