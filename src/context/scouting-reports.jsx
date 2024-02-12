import { scoutingReports } from '../../gameData.json'
import { createContext, useState } from 'react'

/**
 * Context for scouting reports
 * Currently used between game-details and scouting-reports pages
 */
const ScoutingReportsContext = createContext()

/**
 * Provides reports and an addReport function to children
 * @param {Object} props
 * @param {Object} props.children Children to receive the context
 */
function ScoutingReportsProvider({children}) {
    const [reports, setReports] = useState(scoutingReports)

    const addReport = (newReport) => {
        setReports(prev => [...prev, newReport])
    }

    return (
        <ScoutingReportsContext.Provider value={{reports, addReport}}>
            {children}
        </ScoutingReportsContext.Provider>
    )
}

export {
    ScoutingReportsContext,
    ScoutingReportsProvider
}