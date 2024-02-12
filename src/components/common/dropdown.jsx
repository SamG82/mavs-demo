import { FormControl, InputLabel, Select } from '@mui/material'

/**
 * Custom drop down wrapper for MUI Select
 * @param {Object} props
 * @param {String} props.label String text for InputLabel
 * @param {any} props.value The corresponding value of the selection
 * @param {Function} props.valueSetter Setter function for value
 * @param {Object} props.children Child MenuItems for the dropdown
 * @param {number} maxDropdownHeight Maximum height for the dropdown list, optional
 * @param {any} defaultOption Default option
 */
function Dropdown({label, value, valueSetter, maxDropdownHeight, defaultOption, children}) {

    return (
        <FormControl sx={{ padding: '0.4rem', flexDirection: 'row'}}>
            <InputLabel>{label}</InputLabel>
            <Select
            defaultValue={defaultOption}
            sx={{ maxHeight: 70 }}
            value={value}
            label={label}
            MenuProps={{disableScrollLock: true, style: { maxHeight: maxDropdownHeight }}}
            onChange={event => valueSetter(event.target.value)}>
                {...children}
            </Select>
        </FormControl>
    )
}

export default Dropdown