import { useState } from 'react'
import { Stack } from '@mui/material'
import { PlayerSelector, PlayerStats } from '../../components/player'
import { ScoutingReportForm } from '../../components/scouting-report'
import PlayerChip from '../../components/player/player-chip'

/**
 * Players tab for game details. Contains player selector and a display of box score stats
 * @param {Object} props
 * @param {Object} props.playerBoxScores List of player box scores
 * @param {Object} props.homeTeam Home team data
 * @param {Object} props.awayTeam Away team data
 */
function PlayersTab({playerBoxScores, homeTeam, awayTeam}) {
    const [selectedPlayer, setSelectedPlayer] = useState('')

    return (
        <Stack className='players-tab' alignItems='center'>
            <PlayerSelector
            playerData={playerBoxScores}
            team1={homeTeam} team2={awayTeam}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}/>
            <PlayerStats
            playerStats={playerBoxScores.find(({nbaId}) => nbaId === selectedPlayer)}/>
            <ScoutingReportForm
            PlayerChip={<PlayerChip margin={'1rem'} displayJersey={false} playerId={selectedPlayer}/>}
            playerId={selectedPlayer}
            gameId={playerBoxScores[0].nbaGameId}/>
        </Stack>
        
    )
}

export default PlayersTab