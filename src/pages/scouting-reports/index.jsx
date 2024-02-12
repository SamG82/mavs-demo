import { useContext, useState } from 'react'

import { Stack, TextField } from '@mui/material'

import { ScoutingReportsContext } from '../../context/scouting-reports'
import { ScoutingReportEntry } from '../../components/scouting-report'

import './scouting-reports.css'

/**
 * Scouting reports page
 */
function ScoutingReports() {
    const { reports } = useContext(ScoutingReportsContext)
    const [nameSearch, setNameSearch] = useState('')

    return (
        <div className='scouting-reports'>
            <Stack
            direction='row' alignItems='center' justifyContent='space-between'>
                <h1 className='scouting-reports-title' style={{textAlign: 'center'}} >Scouting Reports</h1>
                <TextField
                value={nameSearch}
                onChange={e => setNameSearch(e.target.value)}
                label='Search by name'
                variant='outlined'/>
            </Stack>
            <div style={{maxHeight: '80vh', overflowY: 'scroll', padding: '0.5rem'}} className='scouting-reports-list'>
                <Stack>
                    {reports.map((report, idx) => {
                        if (nameSearch === '' || report.name.toLowerCase().includes(nameSearch.toLowerCase())) {
                            return  (
                                <ScoutingReportEntry
                                key={idx}
                                scoutingReport={report}
                                defaultExpand={idx === 0}/>
                            )
                        }

                        return null
                })}
                </Stack>
            </div>
        </div>
    )
}

export default ScoutingReports
