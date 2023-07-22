import React, { useState } from 'react'
import  './Register.css'
import { IonContent } from '@ionic/react';
import axios from 'axios';
import { useHistory,useLocation } from "react-router-dom";
export default function Register() {

	let history = useHistory();

 const [Email, setEmail] = useState('')
 const [nom, setNom] = useState('')
 const [prenoms, setPrenoms] = useState('')
 const [statut, setStatut] = useState('')
 const [sexe, setSexe] = useState('')
 const [passe, setPasse] = useState('')
 const [cpasse, setCpasse] = useState('')
 const [MTRICULE, setMTRICULE] = useState('')
 const [id, setId] = useState('')

 const [errorpasse, setErrorpasse] = useState(false)
const handleSubmit = ()=>{
			if(passe != cpasse){
				setErrorpasse(true)
				setPasse('mot de passe incorrect')
				setCpasse('mot de passe incorrect')
			}else{
			 axios.get('http://172.20.10.8:8000/api/emailvalide/'+Email).then((response)=>{
              if(response.data.messages == 'success'){
              	setEmail('email dejas pris')
              }else{
              	 axios.get('http://172.20.10.8:8000/api/register/'+nom+'/'+prenoms+'/'+Email+'/'+MTRICULE+'/'+passe+'/'+statut+'/'+sexe).then((response)=>{
			             console.log(response)
						 history.push('tab1')
						 localStorage.setItem('user',MTRICULE)

			            })
              }
            })
			}
 	}
 	 
  return (
     <> 
                <div className="wrapper fadeInDown">
                        <div id="formContent">
                            <div className="fadeIn first">
                            <img src="https://www.b-cube.in/wp-content/uploads/2014/05/aditya-300x177.jpg" id="icon" alt="User Icon" />
                            <h1>Aditya News</h1>
                        </div>

                            <form>
                           	<div className='form-group' style={{display: 'flex',flexDirection: 'row' }} >
																<input onChange={e => setNom(e.target.value)} value={nom}  type="text" id="login" className="fadeIn second form-control" name="login" placeholder="nom"/>
		                            <input onChange={e => setPrenoms(e.target.value)} value={prenoms}  type="text" id="login" className="fadeIn second" name="login" placeholder="prenom"/>
                            </div>
                            <div className='form-group' style={{display: 'flex',flexDirection: 'row' }} >
                            		<input onChange={e => setMTRICULE(e.target.value)} value={MTRICULE} type="text" id="login" className="fadeIn second" name="login" placeholder="matricule"/>
                            		{Email == 'email dejas pris' ? (<input onChange={e => setEmail(e.target.value)} value={Email} type="text" id="login" className="fadeIn second border-danger" name="login" placeholder="Email"/>) : (<input onChange={e => setEmail(e.target.value)} value={Email} type="text" id="login" className="fadeIn second" name="login" placeholder="Email"/>)}
                            </div>
                            
                           	<div className='form-group' style={{display: 'flex',flexDirection: 'row' }} >
			                            {errorpasse ? (<input  type="text" onChange={e => setPasse(e.target.value)} value={passe} id="password" className="fadeIn third border-danger" name="login" placeholder="verifier vos Mot de passe"/>):(<input  type="text" onChange={e => setPasse(e.target.value)} value={passe} id="password" className="fadeIn third" name="login" placeholder="Mot de passe"/>)}
			                             {errorpasse ? (<input  type="text" onChange={e => setCpasse(e.target.value)} value={cpasse} id="password" className="fadeIn third border-danger" name="login" placeholder="verifier vos Mot de passe"/>):(<input  type="text" onChange={e => setCpasse(e.target.value)} value={cpasse} id="password" className="fadeIn third" name="login" placeholder="confirmer Mot de passe"/>)}
                            </div>
                            
                            
                           	<div className='form-group' style={{display: 'flex',flexDirection: 'row' }} >
                           		<select className='form-control' onChange={e => setSexe(e.target.value)} value={sexe} >
															   <option selected > Choissir sexe</option>
															   <option value="M" >M</option>
															   <option value="F" >F</option>
															</select>
															<select className='form-control' onChange={e => setStatut(e.target.value)} value={statut} >
															   <option selected > Choissir status</option>
															   <option value="ENSEIGNANT" >ENSEIGNANT</option>
															   <option value="DELEGUE" >DELEGUE</option>
															</select>
                           	</div>
                            <input  type="button" onClick={handleSubmit} className="fadeIn fourth" value="Enregistrement"/>
                            </form> 

              
                            <div id="formFooter">
                            <a className="underlineHover" href="login">Connexion</a>
                            </div>

                        </div>
                    </div>
                  </> 
  )
}

		