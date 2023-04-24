import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const Nav = () => {
    const path = useLocation()
  return (
    <div>
        <Link to='/booking'>BOOKING</Link>
        <Link to='/tracking'>TRACKING</Link>
    </div>
  )
}

export default Nav