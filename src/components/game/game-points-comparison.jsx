import { Stack } from '@mui/material'

/**
 * Displays point values beside each other with corresponding colors
 * @param {number} props.leftPoints Left hand side points
 * @param {number} props.rightPoints Right hand side points
 * @param {string} props.leftColor Hex color for left points
 * @param {string} props.rightColor Hex color for right points
 */
function GamePointsComparison({leftPoints, rightPoints, leftColor, rightColor}) {
    return (
       <Stack className='points-divider' direction='row' alignItems='center' justifyContent='center'>
            <span
            className='points left-rounded'
            style={{backgroundColor: leftColor}}
            >{leftPoints}</span>
            <span
            className='points right-rounded'
            style={{backgroundColor: rightColor}}
            >{rightPoints}</span>
        </Stack>
    )
}

export default GamePointsComparison