import gameData from '../../../../gameData.json'

import {
    TimelineItem, TimelineSeparator,
    TimelineConnector, TimelineContent
    , TimelineOppositeContent 
} from '@mui/lab'

import { Avatar, Stack, Badge, Chip, Divider } from '@mui/material'
import { TimerOutlined } from '@mui/icons-material'


const lineHeightBase = 10
const lineHeightScaleFactor = 2

/**
 * Get a scaled line height between two events in px using difference in gameClock times
 * Returns lineHeightBase if time1 is less than time2
 */
const lineHeight = (time1, time2) => {
    const [minutes1, seconds1] = time1.split(':')
    const time1Total = Number(minutes1) * 60 + Number(seconds1)

    const [minutes2, seconds2] = time2.split(':')
    const time2Total = Number(minutes2) * 60 + Number(seconds2)

    const difference = (time1Total - time2Total)
    if (difference < 0) {
        return lineHeightBase
    }

    return lineHeightBase + lineHeightScaleFactor * difference
}

// remove [heading] from description text 
const formatDescription = (descriptionText) => {
    if (!descriptionText.includes(']')) {
        return descriptionText
    }

    return descriptionText.split('] ')[1]
}

/**
 * Simple chip component for team logo/points
 */
const TeamPointsChip = ({score, logo, color, isWinning}) => {
    return (
        <Badge variant='dot' color={isWinning ? 'success' : 'none'} badgeContent={' '}>
            <Chip
            variant='outlined'
            color={color}
            avatar={<Avatar src={logo}/>} label={score}/>
        </Badge>
    )
}

/**
 * @param {Object} props
 * @param {Object} props.entry The entry for the play-by-play data
 * @param {Number} props.index Index of the entry in the play-by-play data array, used for alternating bg colors
 * @param {String} props.nextEntryTime Time string of the next entry in order -  MM:SS format
 * @param {React.Ref} props.innerRef Stored ref for the timeline entrie's scroll position
 */
function EventEntry({entry, index, nextEntryTime, innerRef, homeTeam, awayTeam}) {
    let lineHeightPx = 0
    if (nextEntryTime !== null) {
        lineHeightPx = lineHeight(entry.gameClock, nextEntryTime)
    }

    const description = formatDescription(entry.description)
    const eventTeam = entry.team === homeTeam.team ? homeTeam : awayTeam

    /*
    Get a list of players' avatars involved in the play by checking last name in description.
    This will cause incorrect avatars to be included if players have duplicate last names,
    or if their name is somehow in the rest of the description text, but it's mostly
    accurate so I thought it'd be cool to add
    */
    const playerAvatars = gameData.playerStats.map(({name, photoUrl, team}) => {
        const lastName = name.substring(name.indexOf(' ')+1)
        if (entry.description.includes(lastName)) {
            return (
                <Avatar
                src={photoUrl}
                sx={{border: `1px solid ${team === 'DAL' ? '#1976d2' : 'red'}`}}/>
            )
        }
    })

    return (
        <TimelineItem
        className='timeline-entry'
        sx={{
            backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* time and score details */}
            <TimelineOppositeContent>
                <div
                className='timeline-left-hand-side-content'
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem'
                }}>
                    <Badge badgeContent={`Q${entry.period}`} color='primary'>
                    <Chip
                    variant='outlined'
                    icon={<TimerOutlined/>}
                    label={entry.gameClock}/>
                    </Badge>
                    <Stack
                    spacing={1}
                    direction='row'
                    alignItems='center'
                    divider={<Divider sx={{width: '10px', backgroundColor:'black'}} />}>
                        <TeamPointsChip
                        color={homeTeam.team === 'DAL' ? 'primary' : 'error'}
                        score={entry.homeScore}
                        logo={homeTeam.logo}
                        isWinning={entry.homeScore > entry.awayScore}/>
                        <TeamPointsChip
                        color={awayTeam.team === 'DAL' ? 'primary' : 'error'}
                        score={entry.awayScore}
                        logo={awayTeam.logo}
                        isWinning={entry.awayScore > entry.homeScore}/>
                    </Stack>
                </div>
            </TimelineOppositeContent>

            {/* logo separator and line, or the quarter if it's a start period */}
            <TimelineSeparator ref={innerRef}>
                {description === 'Start Period' ?
                <Chip
                sx={{borderRadius: '50rem', fontWeight: 'bold', fontSize: '1rem', padding: '1.6rem 0.2rem'}}
                color='warning'
                label={`Q${entry.period}`}/>
                :
                <img className='timeline-logo' src={eventTeam.logo} width={'70px'} />
                }
                
                {/* trim off last connecting line if it's the last entry */}
                {nextEntryTime !== null && <TimelineConnector sx={{height: lineHeightPx}}/>}                
            </TimelineSeparator>

            <TimelineContent>
                <Stack direction='row' justifyContent='space-between' spacing={1} alignItems='center'>
                    <p style={{flex: 1}} className='timeline-description-text'>{description}</p>
                   
                    <div className='timeline-avatar-container' style={{display: 'flex', gap: '0.4rem'}}>
                        {...playerAvatars}
                    </div>
                </Stack>
            </TimelineContent>
        </TimelineItem>
    )
}

export default EventEntry