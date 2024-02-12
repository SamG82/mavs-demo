import { Paper, Divider } from '@mui/material'

const containerStyle = {
    padding: '0.6rem 1rem',
    display: 'grid',
    gridTemplateColumns: '2fr 20px 1fr',
    alignItems: 'center'
}

const dataStyle = {
    fontSize: '1.5rem',
    textAlign: 'right',
    marginLeft: '1rem'
}

/**
 * Displays a stat banner with text and numerical data
 * @param {Object} props
 * @param {String} props.text The text description of the data ex. 'Points'
 * @param {Number} props.data Numerical data
 * @param {String} props.textColor Text color for props.data
 */
function PlayerStatBanner({text, data, textColor}) {
    return (
        <Paper elevation={2} sx={{borderRadius: 100}} className='stat-banner'>
            <div style={containerStyle}>
                <div style={{ fontSize: '1.2rem' }}>
                    {text}
                </div>
                <Divider orientation='vertical'/>
                <div
                style={{...dataStyle, color: textColor}}>{data}</div>
            </div>
        </Paper>
    )
}

export default PlayerStatBanner