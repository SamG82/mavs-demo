import { Stack } from '@mui/material'
import {Routes, Route} from 'react-router-dom'

import { Navbar } from './components/common'
import { TeamSchedule, GameDetails, ScoutingReports, TeamRanks } from './pages'
import { ScoutingReportsProvider } from './context/scouting-reports'

/**
 * App entrypoint
 */
function App() {
  return (
    <Stack className='app' gap={2} alignItems='center'>
      <Navbar/>
      <main>
        <ScoutingReportsProvider>
          <Routes>
            <Route path='/' element={<TeamSchedule/>}/>
            <Route path='/games/:gameId' element={<GameDetails/>}/>
            <Route path='/scouting-reports' element={<ScoutingReports/>}/>
            <Route path='/team-ranks' element={<TeamRanks/>}/>
          </Routes>
        </ScoutingReportsProvider>
      </main>
    </Stack>
  )
}

export default App
