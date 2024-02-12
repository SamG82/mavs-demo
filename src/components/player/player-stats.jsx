import { StatBanner } from '../common/'

/**
 * Displays player stats 
 * @param {Object} props
 * @param {Object} props.playerStats A singular player stats object
 */
function PlayerStats({playerStats}) {
    if (playerStats === undefined) return null

    return (
        <div className='player-stats' style={{display: 'flex', gap: '1rem', margin: '1.5rem'}}>
            <StatBanner text='Points' data={playerStats.pts}/>
            
            <StatBanner
            text='Plus/Minus'
            data={playerStats.plusMinus}
            textColor={playerStats.plusMinus > 0 ? '#66bb6a' : '#f44336'}/>

            <StatBanner
            text='Minutes'
            data={playerStats.min}/>
        </div>
    )
}

export default PlayerStats