import { Stack, MenuItem, Menu, Button } from '@mui/material'
import gameData from '../../../../gameData.json'

import { Timeline } from '@mui/lab'

import { useState, useRef } from 'react'
import EventEntry from './event-entry'

/**
 *  Displays play by play timeline with timestamps and event data
 * @param {Object} props
 * @param {Number} props.gameId nbaGameId for the play by play data
 */
function PlayByPlay({game, homeTeam, awayTeam}) {
    const playByPlayData = gameData.gamePlayByPlay.filter(({nbaGameId}) => nbaGameId === game.nbaGameId)

    // get the unique available quarters that have been played in the game 
    const availableQuarters = new Set()
    playByPlayData.forEach(({period}) => {
        availableQuarters.add(period)
    })
    
    const [menuAnchor, setMenuAnchor] = useState(null)
    const open = Boolean(menuAnchor)

    // last element in the timeline for scrolling to end
    const endingEventRef = useRef(null)

    // store quarter refs elements in the timeline for scrolling
    let quarterRefs = {}
    availableQuarters.forEach((quarterNum, _) => quarterRefs[quarterNum] = useRef(null))
    const handleQuarterSelect = (event) => {
        setMenuAnchor(event.currentTarget)
    }

    const handleMenuClose = () => {
        setMenuAnchor(null)
    }

    const selectAndClose = (quarter) => {
        quarterRefs[quarter].current.scrollIntoView()
        handleMenuClose()
    }

    return (
        <div className='play-by-play' style={{display: 'flex', flexDirection: 'column'}}>
            <div className='timeline-container' style={{maxHeight: 430, overflowY: 'scroll'}}>
                <Timeline>
                {/* Loop over events, determine whether the event needs an ending ref or quarter ref or scrolling */}
                {playByPlayData.map((entry, idx) => {
                    const isEnd = idx === playByPlayData.length - 1
                    
                    const nextTime = isEnd ? null : playByPlayData[idx + 1].gameClock
                    
                    let ref = null
                    if (isEnd) {
                        ref = endingEventRef
                    } else if (entry.description === 'Start Period') {
                        ref = quarterRefs[entry.period]
                    }

                    return (
                        <EventEntry
                        innerRef={ref} homeTeam={homeTeam} awayTeam={awayTeam}
                        key={idx} entry={entry} index={idx}
                        nextEntryTime={nextTime}/>
                    )
                })}
                </Timeline>
            </div>
            
            {/* button controls */}
            <Stack margin={2} direction='row' justifyContent='flex-end' spacing={1}>
                <Button
                onClick={_ => endingEventRef.current.scrollIntoView()}
                variant='contained'>
                    Go to end
                </Button>
                <Button
                onClick={handleQuarterSelect}
                variant='contained'>
                    Jump to Quarter
                </Button>
            </Stack>
            <Menu
            anchorEl={menuAnchor}
            open={open}
            onClose={handleMenuClose}>
                {[...availableQuarters].map((quarter, idx) => (
                    <MenuItem
                    key={idx}
                    onClick={_ => selectAndClose(quarter)}>
                        Q{quarter}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default PlayByPlay