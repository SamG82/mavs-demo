import { Button } from "@mui/material"
import { Link } from 'react-router-dom'

const baseLinKStyles = {
    textDecoration: 'none',
    width: '100%',
    height: '100%'
}

const baseButtonStyles = {
    padding: 0
}

/**
 * Wrapper for a react-router Link within an MUI Button
 * @param {Object} props
 * @param {String} props.text Text to display
 * @param {String} props.url Url for link
 * @param {String} props.variant MUI variant to be passed to button
 * @param {String} props.color MUI palette color
 * @param {Object} props.linkStyle Styles for the <a> link
 * @param {Object} props.buttonStyle Styles for the Button
 * @param {Boolean} props.disabled Disabled state for Button
 */
function ButtonLink({text, url, variant, color, linkStyle, buttonStyle, disabled, fullWidth}) {
    return (
        <Button
        fullWidth={fullWidth}
        disabled={disabled}
        sx={{...baseButtonStyles, ...buttonStyle}}
        color={color}
        variant={variant}>
            <Link
            className='button-link'
            style={{...baseLinKStyles, ...linkStyle}}
            to={url}>
                {text}
            </Link>
        </Button>
    )
}

export default ButtonLink