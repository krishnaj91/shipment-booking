import React, { useState } from 'react'
import './tracking.css'
import SearchIcon from '@mui/icons-material/Search';

const Tracking = () => {
  const [search,setSearch]=useState('')
  const [searchError,setSearchError]=useState<any>('')

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  };

  const handleChange = (e:any)=>{
    setSearch(e)
    setSearchError('')
  }

  const validate=()=>{
    if(search===''){
      setSearchError('Please Enter Your Order ID')
    }
    else if(search.length<12){
      setSearchError('Invalid Order ID')
    }
    else if(search!==sessionStorage.getItem('order')){
      setSearchError('Please Check Your Order ID (Shipment Not Found)')
    }
    else{
      setSearchError('')
    }
  }

  const handleSubmit = ()=>{
    validate()
    if(search===sessionStorage.getItem('order')){
      alert('k')
    }
  }
  return (
    <div className='tracking'>
      <h1>Enter your 12 Digit Order ID to check the Status</h1>
      <div className='search' >
        <SearchIcon className='search-icon' fontSize="large" onClick={handleSubmit}/>
        <input placeholder='Search.......' type='search' value={search} className='search-inpt' onChange={(e:any)=>handleChange(e.target.value.toString().slice(0,12).toUpperCase())} onKeyPress={handleKeyPress}/>
      </div>
      <p className='red'>{searchError}</p>
    </div>
  )
}

export default Tracking