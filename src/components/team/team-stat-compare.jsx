import { Chip, Stack, Paper } from "@mui/material"
import { KeyboardDoubleArrowUpOutlined, KeyboardDoubleArrowDownOutlined } from '@mui/icons-material'

const arrowFontSize = '2rem'

// greater than/less than icons
const icons = {
    false: <KeyboardDoubleArrowDownOutlined color='error' sx={{fontSize: arrowFontSize}}/>,
    true: <KeyboardDoubleArrowUpOutlined color='success' sx={{fontSize: arrowFontSize}}/>
}

/**
 * Displays a stat comparison listing
 * @param {Object} props
 * @param {String} props.name The name of the statistic ex. 'Turnovers'
 * @param {Number} props.value1 Left hand side value
 * @param {Number} props.value2 Right hand side value
 */
function TeamStatCompare({name, value1, value2}) {
    return (
        <Paper className='team-stats-compare'>
            <div style={{display: 'grid', alignItems: 'center', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                <Stack direction='row' justifyContent='center' alignItems='center'>
                    <h2 style={{textAlign: 'center', width: '100%'}}>{value1}</h2>
                    {icons[value1 > value2]}
                </Stack>
                <Chip className='team-stats-divder' sx={{fontSize: '1.2rem', padding: '1.4rem 0'}} label={name}/>
                <Stack direction='row' justifyContent='center' alignItems='center'>
                    {icons[value2 > value1]}
                    <h2 style={{textAlign: 'center', width: '100%'}}>{value2}</h2>
                </Stack>
            </div>
        </Paper>
    )
}

export default TeamStatCompare