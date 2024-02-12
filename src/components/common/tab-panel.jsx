import { Collapse } from '@mui/material'

/**
 * Wrapper for tab content controlled by tab buttons
 * @param {Object} props
 * @param {Object} props.children Children to be rendered within the tab
 * @param {number} props.value The current value of the tab switcher
 * @param {Object} props.index The assigned index of the specific TabPanel
 */
function TabPanel({children, value, index}) {
    return (
        <Collapse timeout={500} in={value === index}>
        <div className='tab-panel' hidden={value !== index}>
            {value === index && (
                {...children}
            )}
        </div>
        </Collapse>
        
    )
}

export default TabPanel