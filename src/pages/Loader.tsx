import React, { useEffect } from 'react'
import { useHistory,useLocation } from "react-router-dom";


export default function Loader() {

  let history = useHistory();
  useEffect(() => {
    setTimeout(()=>{
        history.push('home')
    },7000)
  }, [])
  

  return (
    <div style={{width:'100%',height:'100%',backgroundColor:'#fff',marginTop:'10px'}}>
      <img src='/assets/loader.gif' style={{width:'100%',height:'100%'}} />
    </div>
  )
}
