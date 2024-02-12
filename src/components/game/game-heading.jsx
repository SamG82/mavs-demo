import TeamBanner from '../team/team-banner'
import GamePointsComparison from './game-points-comparison'
import { Divider, Chip } from '@mui/material'

const winLossColors = {
    'winner': '#66bb6a',
    'loser': '#f44336',
    'inProgressWinner': '#81c784',
    'inProgressLoser': '#e57373',
}

// get winner and loser statuses in home - away order 
const getPlacements = (game) => {
    if (game.gameStatus === 3) {
        return game.homePts > game.awayPts ? 
            ['winner', 'loser'] : ['loser', 'winner']
    }
    if (game.gameStatus === 2) {
        return game.homePts > game.awayPts ?
            ['inProgressWinner', 'inProgressLoser'] : ['inProgressLoser', 'inProgressWinner']
    }

    return [null, null]
}

/**
 * Heading details for the game matchup - team info divided by points/text
 * Handles win/loss colors
 * @param {Object} props
 * @param {Object} props.game A singular game object
 * @param {Object} props.homeTeam Team data for the home team
 * @param {object} props.awayTeam Team data for the away team
 */
function GameHeading({game, homeTeam, awayTeam}) {
    const [ homeStatus, awayStatus ] = getPlacements(game)        

    return (
        <>
        <TeamBanner teamData={homeTeam} logoBorderColor={winLossColors[homeStatus]}/>
                
        <Divider>
        {game.gameStatus != 1 ?
        <GamePointsComparison
        leftPoints={game.homePts} rightPoints={game.awayPts}
        leftColor={winLossColors[homeStatus]} rightColor={winLossColors[awayStatus]}/>
        : <Chip label='VS'/>}
        </Divider>
            
        <TeamBanner teamData={awayTeam} logoBorderColor={winLossColors[awayStatus]}/>
        </>
    )
}

export default GameHeading