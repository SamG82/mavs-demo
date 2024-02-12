import { useState } from 'react'
import { teamRanks, teamData, standings } from '../../../gameData.json'
import { Paper, MenuItem, Avatar, Divider, Chip, Stack, Typography } from '@mui/material'
import { Dropdown } from '../../components/common'
import { TeamStatCompare } from '../../components/team'

import './team-ranks.css'

const mavsLogoSize = '80px'

const stats = [
    {
        displayName: 'Offensive rating',
        jsonKey: 'OFF RTG',
        ratingJsonKey: 'OFF RTG_rank'
    },
    {
        displayName: 'Defensive rating',
        jsonKey: 'DEF RTG',
        ratingJsonKey: 'DEF RTG_rank'
    },
    {
        displayName: 'Field goals (%EFA)',
        jsonKey: 'EFG%',
        ratingJsonKey: 'EFG%_rank'
    },
    {
        displayName: 'Turnovers',
        jsonKey: 'TURNOVERS',
        ratingJsonKey: 'TURNOVERS_rank'
    }
]


/**
 * Gets combined teamRanks, standings, and teamData info for all games that have teamData available. 
 * Returns 'mavsData' - singular object for Mavericks data, and 'competitors', - array of the other teams data
 */
const getCombinedStats = () => {
    const result = {
        mavsData: {},
        competitors: []
    }

    teamData.forEach((teamData, _) => {
        const teamRankData = teamRanks.find(({team}) => team === teamData.team)
        const teamStandingsData = standings.find(({teamAbbreviation}) => teamAbbreviation === teamData.team)

        const combined = {
            ...teamData,
            ...teamRankData,
            ...teamStandingsData
        }

        if (teamData.team === 'DAL') {
            result.mavsData = combined
            return
        }

        result.competitors.push(combined)
    })

    return result
}

/**
 * Displays stats for how Mavs compare to competitors - current displaying OFF rating, DEF rating, EFA, and Turnovers
 */
function TeamRanks() {
    const { mavsData, competitors } = getCombinedStats()
    const [selectedCompetitor, setSelectedCompetitor] = useState(0)

    
    return (
        <div className='team-ranks'>
            <h1>Team Ranks</h1>
            <Paper sx={{padding: '1rem'}} elevation={5}>
                <div className='team-ranks-header'>
                    <Avatar
                    sx={{ width: mavsLogoSize, height: mavsLogoSize, justifySelf: 'end'}}
                    src={mavsData.logo}/>
                    <Divider sx={{margin: '0 2rem'}}><Chip label='VS'/></Divider>
                    <Dropdown
                    label='Competitor'
                    defaultOption={selectedCompetitor}
                    value={selectedCompetitor}
                        valueSetter={setSelectedCompetitor}>
                        {competitors.map((competitor, idx) => (
                            <MenuItem value={idx} key={idx}>
                                <Stack
                                direction='row'
                                width='100%'
                                justifyContent='space-between' alignItems='center' spacing={2}>
                                    <Typography variant='h6'>{competitor.teamName}</Typography>
                                    <Avatar
                                    src={competitor.logo}/>
                                </Stack>
                            </MenuItem>
                        ))}
                    </Dropdown>
                </div>
                <Stack spacing={2}>
                    {stats.map((stat, idx) => (
                        <TeamStatCompare
                        key={idx}
                        name={stat.displayName}
                        value1={mavsData[stat.jsonKey]}
                        value2={competitors[selectedCompetitor][stat.jsonKey]}/>
                    ))}
                </Stack>
            </Paper>
        </div>
    )
}

export default TeamRanks
