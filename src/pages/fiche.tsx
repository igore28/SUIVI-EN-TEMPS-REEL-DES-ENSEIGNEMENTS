import React, { useState,useEffect } from 'react'
import  './fiche.css';
import { IonContent,IonAlert } from '@ionic/react';
 import axios from 'axios';
 import img from '../components/loader/l2.gif';
export default function Fiche() {
    
    const [page, setPage] = useState(1);
 
    const [datej, setDatej] = useState('')
    const [salle, setSalle] = useState('')
    const [seances, setSeance] = useState('')
    const [semestre, setSemestre] = useState('')
    const [titre, setTitre] = useState('')
    const [heured, setHeured] = useState('')
    const [heuref, setHeuref] = useState('')
    const [heuret, setHeuret] = useState('')
    const [niveau, setNiveau] = useState('')
    const [contenu, setContenu] = useState('')
    const [Enseignant, setEnseignant] = useState('')
    const [UE, setUE] = useState('')
    const [cours, setCours] = useState([{id:"",nom:"",titre:""}])
    const [chapitres, setChapitres] = useState([{idch:"",nom:"",status:"",idcour:"",date:""}])
    const [chapitre, setChapitre] = useState("")
    const [status, setStatus] = useState("")
    const [cour, setCour] = useState('')
     const [loader,setLoader] = useState(true)
     const [isOpen1, setIsOpen1] = useState(false);

  useEffect(() => {
    setTimeout(()=>{
       setLoader(false)
    },4000)
  }, [])
 
    const pages = [{p:1,active:true,btn:(
        <IonContent className="white section">
            <div className="container-fluid white section wrapper fadeInDown"  > 
         <div className="row" style={{marginTop:0,marginLeft:2}}>
                <div className="row">
                <p className="page-title" style={{
                    color:'#357796',
                    textAlign:'center',
                    fontSize:20,
                    position:'relative',
                    top:-129,
                    width:'100%',
                    marginLeft:30
                }}>INFORMATION 1</p>
                    <div className="form-group" style={{
                        marginTop:0,
                        width:'100%',
                         position:'relative',
                        top:-130,
                        marginLeft:15,
                    }} >
                           <label  
                                className="text-uppercase"
                                style={{width:'100%',color:'#000'}}
                                >
                                 Date du jour 
                                </label> 
                            <input 
                            type="date" 
                            name="fname" 
                            id="fname" 
                            placeholder=""
                            style={{backgroundColor:"#fff",width:'90%',border:'1px solid #338890',padding:40}}  
                            value={datej} 
                            onChange={(e)=>setDatej(e.target.value)} 
                            className="form-control "
                            />
                      
                </div>
            </div>
            
                    <div className="form-group" style={{
                        marginTop:0,
                        width:'100%',
                         position:'relative',
                        top:-109,
                    }} >
                        <label style={{width:'100%',color:'#000'}} className="text-uppercase"> Salle</label> 
                        <input value={salle} onChange={(e)=>setSalle(e.target.value)} 
                        type="text"
                        style={{backgroundColor:"#fff",width:'90%',border:'1px solid #338890',padding:40}} 
                        name="fname" 
                        id="fname" 
                        placeholder="Salle" 
                        className="form-control "/>
                </div>
                    <div className="form-group" style={{
                        marginTop:0,
                        width:'90%',
                         position:'relative',
                        top:-90,
                    }}>
                        <label style={{width:'100%',color:'#000'}} className="text-uppercase">Seance </label> 
                        <input value={seances} onChange={(e)=>setSeance(e.target.value)} 
                            type="text" 
                            name="fname"
                            style={{backgroundColor:"#fff",width:'100%',border:'1px solid #338890',padding:40}}  
                            id="fname" 
                            placeholder="Seance" 
                            className="form-control "
                            />
                </div>
            </div>	 
            <button className='btn btn-success btn-sm' 
                        style={{
                            width:'95%',
                            marginLeft:4,
                            padding:10,
                             position:'relative',
                             top:-45,
                        }} 
                        onClick={()=>{changePageS()}} >
                        SUIVANT
                        </button>
                  </div>
                  </IonContent>
    )},{p:2,active:false,btn:(

        <IonContent className="">
            <div className="container-fluid white section wrapper fadeInDown">
      
         <div className="row" style={{}}>
                <p className="page-title" style={{
                    color:'#357796',
                    textAlign:'center',
                    fontSize:20,
                    position:'relative',
                    top:-69,
                    width:'100%'
                }}>INFORMATION 2</p>
            <div className="col-sm-12">
                    <div className="col-xs-12" style={{ 
                        marginTop:0,
                        width:'92%',
                         position:'relative',
                        top:-40,
                    }} >
                        <label style={{width:'50%',color:'#000'}} className="text-uppercase">Titre</label> 
                        <input type="text" 
                        name="fname"
                        style={{backgroundColor:"#fff",width:"100%",border:'1px solid #338890'}}  
                        value={titre} 
                        onChange={(e)=>setTitre(e.target.value)} 
                        id="fname" 
                        placeholder="titre" 
                        className="form-control"

                        />
                </div>
            </div>
            <div className="col-sm-12" style={{ 
                        marginTop:0,
                        width:'92%',
                         position:'relative',
                        top:-40,
                        marginLeft:15
                    }}>
                <div className="row" style={{display:'flex',flexDirection:'row'}} >
                    <div className="col-xs-6" >
                        <label style={{width:'50%',color:'#000'}} 
                        className="text-uppercase mt-4">Heure debut </label> 
                        <input type="time" 
                        value={heured} 
                        onChange={(e)=>setHeured(e.target.value)} 
                        name="fname" id="fname" 
                        placeholder="Heure debut" 
                        className="form-control"
                        style={{width:"100%",border:'1px solid #338890'}}
                        />
                </div>

                <div className="col-xs-6"  >
                        <label style={{width:'50%',color:'#000'}}
                         className="text-uppercase mt-4">Heure fin &nbsp;&nbsp;</label> 
                        <input type="time" 
                        value={heuref} 
                        onChange={(e)=>setHeuref(e.target.value)} 
                        name="fname" 
                        id="fname" 
                        placeholder="Heure fin" 
                        className="form-control"
                        style={{width:"90%",border:'1px solid #338890'}}
                        />
                </div>
            </div>

                    
            </div>
            
           
            <div className="col-sm-12" style={{ 
                        marginTop:0,
                        width:'92%',
                         position:'relative',
                        top:-40,
                        marginLeft:25
                    }}>
                <div className="row">
                    <div className="col-xs-12" >
                        <label style={{width:'50%',color:'#000'}}
                           className="text-uppercase mt-4">
                          Total horraire
                          </label> 
                        <input 
                         type="number" 
                         value={heuret} 
                         onChange={(e)=>setHeuret(e.target.value)} 
                         name="fname"
                         placeholder="Total horraire" 
                         className="form-control"
                         style={{backgroundColor:"#fff",width:"90%",border:'1px solid #338890'}}
                         />
                </div>
            </div>
            </div>

            </div>	
            <div className="form-group" 
                        style={{
                             marginLeft:5,
                            padding:10,
                             position:'relative',
                             top:-45,
                             display:"flex",
                             flexDirection:'row',
                             justifyContent:'space-around',
                              width:'100%',
                        }} >
                <button className='btn btn-warning mr-4 mt-4 btn-sm' style={{marginLeft:10}}  onClick={()=>{changePageR()}} >RETOUR</button>
                <button className='btn btn-success ml-4 mt-4 btn-sm'  onClick={()=>{changePageS()}} >SUIVANT</button>
            </div> 
           
                  </div>
                  </IonContent>
    )},
    {p:3,active:false,btn:(

        <IonContent className="">
            <div className="white section wrapper fadeInDown">
     
         <div className="row" style={{}} >
            <p className="page-title" style={{
                    color:'#357796',
                    textAlign:'center',
                    fontSize:20,
                    position:'relative',
                    top:-59,
                    width:'100%'
                }}>INFORMATION 3</p>
                        <div className="form-group" 
                        style={{ 
                        marginTop:0,
                        width:'100%',
                         position:'relative',
                        top:-50,
                        marginLeft:15
                    }} >
                        <select value={cour} onChange={(e)=>handleChange(e)} 
                                style={{backgroundColor:"#fff",width:290,border:'1px solid #338890'}}  
                                className="form-control" 
                                id="exampleFormControlSelect1"
                            >
                            <option>select cours</option>
                            {
                                cours.map((item,i)=>{
                                   return   (
                                    <option key={item.id} value={item.id} >{item.nom}</option>
                                   )
                                })
                            }
                        </select>
            </div>
                        <div 
                                className="form-group"  
                                id="htstch"
                                  style={{ 
                                    marginTop:0,
                                    width:'100%',
                                     position:'relative',
                                    top:-50,
                                    marginLeft:15
                                }}
                                    >
                                    <select onChange={(e)=>setChapitre(e.target.value)}  
                                     className="form-control" 
                                     name="st" 
                                     id="st"
                                     style={{backgroundColor:"#fff",width:290,border:'1px solid #338890'}} 
                                    >
                                        <option value='0' disabled selected >CHAPITRE</option>
                                            {
                                                chapitres.map((item,i)=>{
                                                   return   (
                                                    <option key={item.idch} value={item.idch} >{item.nom}</option>
                                                   )
                                                })
                                            }
                                    </select>
                      
            
            </div>

                        <div className="form-group"  
                             id="htst" 
                                 style={{ 
                                    marginTop:0,
                                    width:'100%',
                                     position:'relative',
                                    top:-50,
                                    marginLeft:15
                                }}
                             >
                                    <select 
                                        className="form-control"
                                        onChange={(e)=>setStatus(e.target.value)}  
                                        name="st" 
                                        id="st"
                                        style={{backgroundColor:"#fff",width:290,border:'1px solid #338890'}}
                                    >
                                        <option value='0' disabled selected >STATUT CHAPITRE</option>
                                            <option value='debut' >debut chapitre</option>
                                            <option value='suite' >suite chapitre</option>
                                            <option value='fin' >fin chapitre</option>
                                    </select>
                        </div>

                            
                    <div className="col-xs-12"   style={{ 
                        marginTop:0,
                        width:'100%',
                         position:'relative',
                        top:-50,
                        marginLeft:0
                    }} >
                        <label style={{width:'50%',color:'#000'}}  className="text-uppercase">Contenu </label> 
                        <input 
                        value={contenu} 
                        onChange={(e)=>setContenu(e.target.value)} 
                        type="text" 
                        name="fname"
                        className="form-control"
                        style={{padding:"60px",backgroundColor:"#fff",border:'1px solid #338890',width:'97%'}}
                        />
                </div>

        
            </div>

            <div className="form-group" 
                        style={{
                            width:'100%',
                            marginLeft:1,
                            padding:10,
                             position:'relative',
                             top:-45,
                             display:"flex",
                             flexDirection:'row',
                             justifyContent:'space-around'
                        }} >
               <button className='btn btn-warning mr-4 btn-sm' style={{marginLeft:0}} onClick={()=>{changePageR()}} >RETOUR</button>
            {localStorage.getItem('statut') == 'ENSEIGNANT' ? null : ( <button className='btn btn-success ml-4 btn-sm'  
                onClick={()=>{changePageV()}} >VALIDER</button>) }
            </div> 

            
           
                  </div>
                   <IonAlert
                        isOpen={isOpen1}
                        header="Alert"
                        subHeader="VERIFIER VOS INFORMATION"
                        message="FICHE NON  ENREGISTRER  "
                        buttons={[
                          {
                            text: 'OK',
                            role: 'confirm',
                            handler: () => {
                             
                            },
                          },
                        ]}
                        onDidDismiss={() => setIsOpen1(false)}
                      ></IonAlert>
                  </IonContent>
    )}  
]





    const changePageS = ()=>{
       setPage(page + 1)
    }

    const changePageR = ()=>{
        setPage(page -1)
    }

    const changePageV = ()=>{
        console.log(semestre)
         setLoader(true)
            axios.get('http://127.0.0.1:8000/api/saveFiche/'+semestre+'/'+UE+'/'+chapitre+'/'+salle+'/'+seances+'/'+titre+'/'+heured+'/'+heuref+'/'+heuret+'/'+niveau+'/'+contenu+'/'+datej+'/'+cour+'/'+Enseignant+'/'+status).then(async (response)=>{
        console.log(response)
         setLoader(false)
        }).catch((error)=> {
            setTimeout(()=>{
              setLoader(false)
            },2000)
       setTimeout(()=>{
        setIsOpen1(true)
    },1000)
      
      
    })
    }

    const allCour = ()=>{
        axios.get('http://127.0.0.1:8000/api/cours/').then( async (response)=>{
    console.log(response)
    setCours(response.data)
    })


}

const handleChange = (e:any)=>{
    console.log(e.target.value)
    setCour(e.target.value)
    let idcour = e.target.value
    axios.get('http://127.0.0.1:8000/api/chapitre/'+idcour).then( async (response)=>{
        console.log(response)
    setChapitres(response.data)
  
  
    })

    axios.get('http://127.0.0.1:8000/api/coursid/'+idcour).then( async (response)=>{
        setEnseignant(response.data[0].enseignant)
          setUE(response.data[0].nom)
          setSemestre(response.data[0].idsemestre)
          setNiveau(response.data[0].idniveau)
    })
}

    useEffect(() => {
        allCour()
    },[])
    

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
        {pages.map((elem,index)=>{
                if(page == elem.p){
                    return elem.btn
                }
        })}
              <div className='navigation' style={{position:'fixed',bottom:0}}>
         <ul>
           <li  className='list' >
             <a href='tab1' >
               <span className='icon'  ><i className="fa fa-home"></i></span>
               <span className='test'   >Acceuil</span>
             </a>
           </li>
           <li className='list' >
             <a href='tab3' >
               <span className='icon' ><i className="fa fa-book"></i></span>
               <span className='test' >Fiches</span>
             </a>
           </li>
           <li className='list' >
             <a href='alert ' >
               <span className='icon'  ><i className="fa fa-bell"></i></span>
               <span className='test'  >Alert</span>
             </a>
           </li>
           <li className='list activ' >
             <a href='fiche' >
               <span className='icon' style={{color:"white"}} ><i className="fa fa-file-text"></i></span>
               <span className='test' style={{color:"white"}} >Emmargement</span>
             </a>
           </li>
         </ul>
      </div>
          </> 
              )
    
  }

    }
