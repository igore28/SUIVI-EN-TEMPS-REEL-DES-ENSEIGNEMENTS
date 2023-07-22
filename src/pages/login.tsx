import React, { useState } from 'react'
import  './login.css'
import axios from 'axios';
import img from '../components/loader/l1.gif';
import { useHistory,useLocation } from "react-router-dom";

export default function Login() {
  let history = useHistory();
 const [username,setUsername] = useState('')
 const [password,setPassword] = useState('')
 const [loader,setLoader] = useState(false)
 const [error,setError] = useState(false)

  const handleLogin = (e:any)=>{
    console.log(username)
    e.preventDefault()
    setLoader(true)
 
    try{
        axios.get('http://127.0.0.1:8000/api/login/'+username+'/'+password).then((response)=>{
            console.log(response)
            if(response.data.messages == 'echec'){
              setError(true)
              setLoader(false)
            }else{
              setLoader(false)
              select_user(username)
            localStorage.setItem('user',username)
            axios.get('http://127.0.0.1:8000/api/user/'+username).then( async (response)=>{
              localStorage.setItem('user_ens',response.data[0].nom)
              localStorage.setItem('statutd',response.data[0].statutd)
              if(response.data[0].statut == "ENSEIGNANT"){
                history.push('ens')
              }else{
                history.push('tab1')
              }
           
          })
             
            }
            
          }).catch((error)=> {
       setError(true)
      setLoader(false)
    })
    } catch(error) {
       setError(true)
      setLoader(false)
    }

  
  }

  const select_user = (username:any)=>{
    axios.get('http://127.0.0.1:8000/api/user/'+username).then( async (response)=>{
      console.log(response.data[0].statut)
      localStorage.setItem('statut',response.data[0].statut)
  })
  }

  const handleUsername = (e:any)=>{
    setUsername(e.target.value)
  }

  const handlePassword = (e:any)=>{
    setPassword(e.target.value)
  }

  if(loader == true){
    return (
      <> 
        <div className="wrapper fadeInDown">
                <div id="formContent">
                <img src={img} id="icon" style={{width:400}} alt="User Icon" />
                    
                </div>
            </div>
      </> 
      )
  }else {
    return (
     <> 
        <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                    <img src="/assets/logo.png" id="icon" alt="User Icon" />
                    {
                      error ? 
                    (<h1 className='text-danger' >Mot de passe ou Email incorrecte!</h1>) 
                    : (<h1>ICT-COURSE</h1>)
                  }
                </div>

                    <form>
                      <input 
                          onKeyUp={(e)=>{handleUsername(e)}} 
                          type="text" id="login" 
                          className="fadeIn second" 
                          name="login" 
                          placeholder="Matricul user"
                        />
                      <input 
                        onKeyUp={(e)=>{handlePassword(e)}} 
                        type="password" 
                        id="password" 
                        className="fadeIn third" 
                        name="login" 
                        placeholder="Mot de passe"
                      />
                     <button 
                       className='btn btn-info btn-lg'  
                       onClick={(e)=>{handleLogin(e)}}
                       style={{width:220,fontFamily:'Times New Roman'}}  
                       >
                         connexion
                       </button>
                    </form>
                </div>
            </div>
          </> 
      )
    
  }
  
}
