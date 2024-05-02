import React, { Component } from 'react'
import loading from './loading.gif'
 const Spinner =(props)=> {

    return (
      <div className='flex items-center justify-center'>
        <img  className='my-3'src={loading} alt="load" />
      </div>
    )
  
}

export default Spinner
