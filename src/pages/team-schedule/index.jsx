import { games, teamData } from '../../../gameData.json'

import { Stack, MenuItem, Divider } from '@mui/material'
import { useState, useEffect } from 'react'

import { GameListing, GameStatusChip } from '../../components/game'

import './team-schedule.css'
import { Dropdown } from '../../components/common'

// sort games by oldest or newest
const sortGames = (games, newest) => {
    let copiedGames = [...games]
        
    if (newest) {
        copiedGames.sort((game1, game2) => new Date(game2.date) - new Date(game1.date))
    } else {
        copiedGames.sort((game1, game2) => new Date(game1.date) - new Date(game2.date))
    }

    return copiedGames
}

/**
 * Team schedule page that displays the list of games
 */
function TeamSchedule() {
    const [sortBy, setSortBy] = useState('Oldest')
    const [gamesList, setGamesList] = useState(sortGames(games, sortBy === 'Newest'))
    
    // set sortBy whenever input changes
    const handleSortChange = (newSort) => {
        if (newSort === sortBy) { return }
        setSortBy(newSort)
    }

    // re-sort the games
    useEffect(() => {
        const sortedGames = sortGames(gamesList, sortBy === 'Newest')
        setGamesList(sortedGames)
    }, [sortBy])

    return (
        <Stack
        className="team-schedule"
        spacing={3}
        divider={<Divider sx={{bgcolor: 'primary.main'}}/>}>
            <Stack className='schedule-header' flexDirection='row' alignItems='center' justifyContent='space-between'>
                <h1 className='schedule-header'>Team Schedule</h1>
                <Dropdown
                label='Sort by'
                value={sortBy}
                valueSetter={handleSortChange}>
                    <MenuItem value={'Oldest'}>Oldest</MenuItem>
                    <MenuItem value={'Newest'}>Newest</MenuItem>
                </Dropdown>
            </Stack>
            <div className='game-list'>
                {gamesList.map((game, idx) => {
                    // get extra necessary team data like icons and full names
                    const homeTeam = teamData.find(data => data.team === game.homeTeam)
                    const awayTeam = teamData.find(data => data.team == game.awayTeam)

                    return (
                        <GameStatusChip key={idx} game={game}>
                            <GameListing
                            game={game} homeTeam={homeTeam} awayTeam={awayTeam}
                            includeLink={true}
                            elevation={5}/>
                        </GameStatusChip>
                    )
                })}
            </div>
        </Stack>

    )
}

export default TeamSchedule