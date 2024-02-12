import { useLocation } from 'react-router-dom'
import { AppBar, SvgIcon, Toolbar, ButtonGroup } from '@mui/material'

import ButtonLink from './button-link'

import MavsLogo from '../../../assets/mavs.svg?react'
import './navbar.css'

// page display names and their  url
const pages = [
    {
        displayName: 'Team Schedule',
        link: '/',
    },
    {
        displayName: 'Scouting Reports',
        link: '/scouting-reports'
    },
    {
        displayName: 'Team Ranks',
        link: '/team-ranks'
    }
]

/**
 * Navbar that contains logo and links at the top of the page
 */
function Navbar() {
    const currentURL = useLocation()
   
    return (
        <AppBar position="sticky" sx={{padding: '0.8rem'}} className='nav-bar'>
        <Toolbar className='nav-bar-items'sx={{gap: '2rem'}}>
            <SvgIcon className="mavs-logo" component={MavsLogo} inheritViewBox/>
            <ButtonGroup className='nav-links' variant="contained">
                {pages.map((page, idx) => (
                    <ButtonLink
                    className='nav-link'
                    color={page.link === currentURL.pathname ? 'buttonActive' : 'secondary'}
                    key={idx}
                    text={page.displayName}
                    url={page.link}
                    linkStyle={{padding: '0.8rem 1rem', color: 'black'}}/>
                ))}
            </ButtonGroup>
        </Toolbar>
        </AppBar>
    )
}

export default Navbar