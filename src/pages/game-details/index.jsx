import { quarterPoints, games, teamData, playerBoxScores } from '../../../gameData.json'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Tab, Tabs, Paper, Alert, Divider } from '@mui/material'
import { ErrorOutline, TimelineOutlined, PersonOutlined, SportsBasketballOutlined } from '@mui/icons-material'
import { BarChart } from '@mui/x-charts'

import { TabPanel } from '../../components/common'
import { GameListing, GameStatusChip } from '../../components/game'

import PlayersTab from './players-tab'
import { PlayByPlay } from './play-by-play'

import './game-details.css'

// returns restructured quarter point data for a bar chart
const formatQuarterPoints = (quarterPoints, gameId) => {
    let result = []
    const filteredbyGame = quarterPoints.filter(({nbaGameId}) => nbaGameId === gameId)

    // loop over quarters
    for (let i = 1; i <= 4; i++) {
        const [team1Entry, team2Entry] = filteredbyGame.filter(({period}) => period === i)
        
        // mapping of each team to their points for the quarter
        let new_entry = {}
        new_entry[team1Entry.team] = team1Entry.pts
        new_entry[team2Entry.team] = team2Entry.pts
        
        // add on the quarter for data key
        new_entry['quarter'] = 'Q' + i

        result.push(new_entry)
    }

    return result
}

/**
 * Displays more in-depth game details based on game id in URL
 */
function GameDetails() {
    const { gameId } = useParams();    
    const [currentTab, setCurrentTab] = useState(0)

    const game = games.find(({nbaGameId}) => nbaGameId === gameId)

    // display error msg if no game found or it hasn't started yet
    if (game === undefined || game.gameStatus === 1) {
        return <Alert icon={<ErrorOutline/>} severity='error'>Couldn't find data for game {gameId}</Alert>
    }

    const homeTeam = teamData.find(({team}) => team === game.homeTeam)
    const awayTeam = teamData.find(({team}) => team === game.awayTeam)
    
    // only box scores for this game, and filter out played who haven't played
    const gameBoxScores = playerBoxScores.filter(
        ({nbaGameId, min}) => nbaGameId === game.nbaGameId && min > 0
    )

    // assuming all games will be mavericks games
    const opponent = homeTeam.team === 'DAL' ? awayTeam : homeTeam

    const gameQuarterPoints = formatQuarterPoints(quarterPoints, gameId)
    
    return (
        <Paper className='game-details' elevation={5}>
            <GameStatusChip game={game}>
                <GameListing game={game} homeTeam={homeTeam} awayTeam={awayTeam} elevation={0}/>
            </GameStatusChip>
            <Divider/>
            <Tabs
            className='details-tabs'
            variant='fullWidth'
            centered={true}
            value={currentTab}
            onChange={(_, newTab) => setCurrentTab(newTab)}>
                <Tab iconPosition='start' icon={<SportsBasketballOutlined/>} label="Quarters"/>
                <Tab iconPosition='start' icon={<PersonOutlined/>} label="Players"/>
                <Tab iconPosition='start' icon={<TimelineOutlined/>} label="Play-by-play"/>
            </Tabs>

            {/* Bar chart of points for each quarter */}
            <TabPanel value={currentTab} index={0}>
                <BarChart
                dataset={gameQuarterPoints}
                xAxis={[{scaleType: 'band', dataKey: 'quarter'}]}
                yAxis={[{label: 'Points'}]}
                series={[
                    { dataKey: 'DAL', label: 'Mavericks', color: '#1976d2'},
                    { dataKey: opponent.team, label: opponent.teamName, color: '#f44336'}
                ]}
                height={300}
                />
            </TabPanel>
            
            {/* Player picker and box score stats */}
            <TabPanel value={currentTab} index={1}>
                <PlayersTab
                playerBoxScores={gameBoxScores}
                homeTeam={homeTeam} awayTeam={awayTeam}/>
            </TabPanel>

            {/* Play by play */}
            <TabPanel value={currentTab} index={2}>
                <PlayByPlay game={game} homeTeam={homeTeam} awayTeam={awayTeam}/>
            </TabPanel>
        </Paper>
    )
}

export default GameDetails