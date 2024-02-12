import { Stack, Typography } from '@mui/material'

/**
 * Displays team logo with concatenated teamCity and teamName underneath
 * @param {Object} props.teamData One teamData object representing the team
 * @param {boolean} props.logoBorderColor Color for the border of team's logo
 */
function TeamBanner({teamData, logoBorderColor}) {
    const border = logoBorderColor === undefined ? 'none' : `2px solid ${logoBorderColor}`
    return (
        <Stack className='team-banner'  justifyContent='center'  alignItems='center' >
            <img
            style={{border, display: 'block', margin: '0.3rem', borderRadius: '50%'}}
            src={teamData.logo}
            width={'70px'}/>
            <Typography
            sx={{textAlign: 'center'}}
            className='team-name'>
                {`${teamData.teamCity} ${teamData.teamName}`}
            </Typography>
        </Stack>
    )
}

export default TeamBanner