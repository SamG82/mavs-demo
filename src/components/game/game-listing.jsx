import { Paper, Chip } from '@mui/material'
import { StadiumOutlined, PlaceOutlined, HomeOutlined, EventOutlined } from '@mui/icons-material'

import GameHeading from './game-heading'

import './game-listing.css'
import { ButtonLink } from '../common'

/**
 * A single game listing in the team schedule. Displays basic overview data.
 * @param {Object} props
 * @param {Object} props.game A singular game object
 * @param {Object} props.homeTeam Team data for the home team
 * @param {object} props.awayTeam Team data for the away team
 * @param {boolean} props.includeLink Includes link to the corresponding details page if true
 * @param {number} props.elevation Elevation for the paper element
 */
function GameListing({game, homeTeam, awayTeam, includeLink, elevation}) {
    return (
        <Paper className='game-listing' elevation={elevation}>
            <div className='team-matchup'>
                <GameHeading game={game} homeTeam={homeTeam} awayTeam={awayTeam}/>
            </div>
            <div className='game-summary-info'>
                {/* display home icon with blue background if it's a home game*/}
                <Chip
                color={game.location === 'Dallas, TX' ? 'primary' : 'default'}
                icon={game.location === 'Dallas, TX' ? <HomeOutlined/> : <PlaceOutlined/>}
                label={game.location}/>
                <Chip icon={<StadiumOutlined/>} label={game.arena}/>
                <Chip icon={<EventOutlined/>} label={game.date.replace(/-/g, ' / ')}/>
            </div>

            {/* add link to corresponding details page */}
            {includeLink &&
            <ButtonLink
            url={`/games/${game.nbaGameId}`}
            text='View more details'
            disabled={game.gameStatus === 1}
            color={game.gameStatus === 2 ? 'warning' : 'primary'}
            buttonStyle={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}
            linkStyle={{color: game.gameStatus === 1 ? 'black' : 'white', padding: '1rem 0'}}
            variant='contained'/>
            }
        </Paper>
    )
}

export default GameListing
