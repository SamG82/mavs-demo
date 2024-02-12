import { useState, useEffect } from 'react'
import { MenuItem, Avatar, Stack } from '@mui/material'

import PlayerChip from './player-chip'
import { Dropdown } from '../common'

const teamLogoSize = '4rem'

/**
 * Filter playerBoxScores by team ex. 'DAL',
 * Returns player data in alphabetical order by name
 */
const getTeamPlayers = (playerData, team) => {
    const filteredByTeam = playerData.filter(entry => entry.team === team)
    return filteredByTeam.sort((p1, p2) => p1.name.localeCompare(p2.name))
}

/**
 * Input controls to select a team/player from a list of box scores, Team 1 is selected by default
 * @param {Object} props
 * @param {number} props.selectedPlayer The selected player's nbaId
 * @param {Function} props.setSelectedPlayer Setter function for selected player
 * @param {Object[]} props.playerData Array of player data from 2 teams, each must contain a team, name, and nbaId property
 * @param {Object} props.team1 Team data for the first team
 * @param {Object} props.team2 Team data for the second team
 */
function PlayerSelector({playerData, team1, team2, selectedPlayer, setSelectedPlayer}) {
    const [selectedTeam, setSelectedTeam] = useState('DAL')
    const [players, setPlayers] = useState(getTeamPlayers(playerData, selectedTeam))
    
    // refilter players by the newly selected team, reassign selectedPlayer to the first
    useEffect(() => {
        const refiltered = getTeamPlayers(playerData, selectedTeam)
        setPlayers(refiltered)
        setSelectedPlayer(refiltered[0].nbaId)
    }, [selectedTeam])

    return (
        <Stack mt='1rem' direction='row' justifyContent='space-evenly'>
            <Stack direction='row' gap={1}>
                {/* Team selection */}
                <Dropdown
                label="Team"
                value={selectedTeam} valueSetter={setSelectedTeam}>
                    <MenuItem sx={{justifyContent: 'center'}} value={team1.team}>
                        <Avatar
                        sx={{width: teamLogoSize, height: teamLogoSize}}
                        src={team1.logo}/>
                    </MenuItem>
                    <MenuItem sx={{justifyContent: 'center'}} value={team2.team}>
                        <Avatar
                        sx={{width: teamLogoSize, height: teamLogoSize}}
                        src={team2.logo}/>
                    </MenuItem>
                </Dropdown>
                
                {/* Player selection */}
                <Dropdown
                label="Player"
                value={selectedPlayer}
                valueSetter={setSelectedPlayer}
                maxDropdownHeight={400}>
                    {players.map((player, idx) => (
                        <MenuItem key={idx} sx={{justifyContent: 'center'}} value={player.nbaId}>
                            <PlayerChip playerId={player.nbaId} displayJersery={true}/>
                        </MenuItem>
                    ))}
                </Dropdown>
            </Stack>
        </Stack>
    )
}

export default PlayerSelector