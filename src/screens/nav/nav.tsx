import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import './nav.css'

const Nav = () => {
    const location = useLocation()
    
  return (
    <div className='nav'>
        <Link to='/' className={location.pathname==='/' ? 'nav-active' : 'nav-items'}>HOME</Link>
        <Link to='/booking' className={location.pathname==='/booking' ? 'nav-active' : 'nav-items'}>BOOKING</Link>
        <Link to='/tracking' className={location.pathname==='/tracking' ? 'nav-active' : 'nav-items'}>TRACKING</Link>
    </div>
  )
}

export default Nav