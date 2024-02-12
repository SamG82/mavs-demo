import { playerStats } from '../.././../gameData.json'

import { useContext, useState } from 'react'
import { ScoutingReportsContext } from '../../context/scouting-reports'
import {
    Dialog, DialogContent, DialogContentText, DialogTitle,
    TextField, Button, DialogActions
} from '@mui/material'

/**
 * Popup form for submitting a scouting report, displays button initially
 * @param {Object} props
 * @param {String} props.playerName Player's name
 * @param {Number} props.playerId nbaId of the player
 * @param {Number} props.gameId nbaGameId of the game
 * @param props.PlayerChip Player chip to be displayed on the form
 */
function ScoutingReportForm({playerId, gameId, PlayerChip}) {
    const { addReport } = useContext(ScoutingReportsContext)
    const [formOpen, setFormOpen] = useState(false)

    return (
        <>
        <Button
        sx={{padding: '1rem 0'}}
        fullWidth variant='contained'
        onClick={_ => setFormOpen(prev => !prev)}>
            Create scouting report
        </Button>
        <Dialog
        fullWidth
        open={formOpen}
        onClose={_ => setFormOpen(false)}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault()
                const formData = new FormData(event.currentTarget)
                const formJson = Object.fromEntries(formData.entries())
                const { scout, report } = formJson

                const { name } = playerStats.find(({nbaId}) => nbaId === playerId)
                
                console.log(gameId)
                
                addReport({
                    nbaGameId: gameId,
                    nbaId: playerId,
                    scout,
                    report,
                    name
                })
                setFormOpen(false)
            }
        }}>
            {PlayerChip}
            <DialogTitle>Submit a scouting report</DialogTitle>
            <DialogContent>
                <DialogContentText>Scout name</DialogContentText>
                <TextField
                autoFocus
                required
                margin='dense'
                name='scout'
                type='text'
                fullWidth
                variant='standard'/>
            </DialogContent>
            <DialogContent>
            <DialogContentText>Enter a report</DialogContentText>
            <TextField
            required
            name='report'
            type='text'
            fullWidth
            variant='standard'
            multiline/>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}} >
                <Button color='error' variant='outlined' onClick={_ => setFormOpen(false)}>
                    Cancel
                </Button>
                <Button type='submit' color='primary' variant='contained'>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default ScoutingReportForm