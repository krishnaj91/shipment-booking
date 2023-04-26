import React, { useState } from 'react'
import './tracking.css'
import SearchIcon from '@mui/icons-material/Search';

const Tracking = () => {
  const [search,setSearch]=useState('')

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  };

  const handleSubmit = ()=>{
    alert('kj')
  }
  return (
    <div className='tracking'>
      <h1>Enter your 12 Digit Order ID to check the Status</h1>
      <div className='search' >
        <SearchIcon className='search-icon' fontSize="large" onClick={handleSubmit}/>
        <input placeholder='Search.......' type='search' value={search} className='search-inpt' onChange={(e:any)=>setSearch(e.target.value.toString().slice(0,12))} onKeyPress={handleKeyPress}/>
      </div>
    </div>
  )
}

export default Tracking