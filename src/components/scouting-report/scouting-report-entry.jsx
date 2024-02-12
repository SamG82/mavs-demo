import { playerStats, teamData } from '../../../gameData.json'
import { PersonSearchOutlined } from '@mui/icons-material'

import {
    Accordion, AccordionSummary, AccordionDetails,
    Typography, Stack, Badge, Chip
} from '@mui/material'

import { ExpandMoreOutlined } from '@mui/icons-material'
import { ButtonLink } from '../common'

const photoSize = 70

/**
 * Displays a singular scouting report
 * @param props
 * @param {Object} props.scoutingReport One scouting report object
 * @param {Boolean} props.defaultExpand Whether the particular report should be expanded by default (ex. first in a list)
 */
function ScoutingReportEntry({scoutingReport}) {
    const player = playerStats.find(({nbaId}) => nbaId === scoutingReport.nbaId)
    const team = teamData.find(({team}) => team === player.team)

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreOutlined/>}>
                <Stack sx={{width: '100%'}} direction='row' alignItems='center' justifyContent='space-between' >
                    <Typography variant='h4'>{scoutingReport.name}</Typography>
                    <Badge
                    anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                    badgeContent={<img width={40} src={team.logo}/>}>
                        <img
                        style={{ display: 'block' }}
                        width={photoSize} src={player.photoUrl}/>
                    </Badge>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Chip icon={<PersonSearchOutlined/>} label={scoutingReport.scout}/>
                <p>{scoutingReport.report}</p>
                <ButtonLink
                fullWidth
                text='View Game'
                linkStyle={{padding: '0.5rem 0', fontSize: '1.4rem', color: '#1976d2'}}
                variant='outlined'
                url={`/games/${scoutingReport.nbaGameId}`}/>
            </AccordionDetails>
        </Accordion>
    )
}

export default ScoutingReportEntry