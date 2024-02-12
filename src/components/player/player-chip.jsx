import gameData from '../../../gameData.json'
import { Badge, Avatar, Chip } from '@mui/material'

const avatarSize = '2.6rem'

/**
 * Player chip containing picture, name, jersey number
 * @param {Object} props
 * @param {number} props.playerId nbaId of the player
 * @param {Function} props.onClick onClick handler for the chip
 * @param {Boolean} props.displayJersery Whether to display jersey number in top right
 * @param {any} props.margin Margin value
 */
function PlayerChip({playerId, onClick, displayJersey, margin}) {
    const playerData = gameData.playerStats.find(({nbaId}) => playerId === nbaId)
    if (playerData === undefined) return null

    // blue if Mavs, red if opponent
    const badgeColor = playerData.team === 'DAL' ? 'primary' : 'error' 
    const avatarColor = badgeColor === 'primary' ? '#1976d2' : '#f44336'

    const avatar = (
        <Avatar sx={{
            border: `1px solid ${avatarColor}`,
            width: avatarSize, height: avatarSize,
        }} src={playerData.photoUrl}/>
    )

    const ChipElement = (
        <Chip
        onClick={onClick}
        sx={{fontSize: '1.1rem', padding: '1.6rem 0', margin}}
        icon={avatar} label={playerData.name}/>
    )
    
    if (displayJersey) {
        return (
            <Badge
            color={badgeColor}
            badgeContent={`#${playerData.jerseyNum}`}>
            ChipElement
            </Badge> 
        )
    }

    return ChipElement
}

export default PlayerChip