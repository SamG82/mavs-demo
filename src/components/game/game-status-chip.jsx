import { Chip, Badge } from '@mui/material'

import './game-status-chip.css'
/**
 * Displays different chip badges according to game status
 * @param {object} props
 * @param {object} props.game A singular game object
 * @param {object} props.children Child elements within the badge
 */
function GameStatusChip({game, children}) {
    let color = 'primary'
    let style = {}
    let label = 'Upcoming'
    let classStr = 'status-badge'

    switch (game.gameStatus) {
    case 2:
        color = 'warning'
        label = game.timeEst
        classStr = 'status-badge pulse-effect'
        break

    case 3:
        color = 'secondary'
        style = {backgroundColor: '#c9c9c9'}
        label = 'Completed'
    }

    const chip = 
        <Chip className={classStr} color={color} style={style} label={label}/>

    return (
        <Badge badgeContent={chip}>
            {children}
        </Badge>
    )
}

export default GameStatusChip